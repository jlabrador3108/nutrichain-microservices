import mysql from 'mysql2/promise'
import { Kafka } from 'kafkajs'

class MySQLService {
  private pool: any
  private kafka: any
  private producer: any
  private kafkaTopic: string
  private pgNotificationsChannel: string

  constructor() {
    // Configuración de la conexión MySQL
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })

    // Configuración de Kafka
    this.kafka = new Kafka({
      clientId: 'mysql-service',
      brokers: ["kafka:9092"],
      connectionTimeout: 3000,
      // sasl:
      //   process.env.STAGE === 'dev' || process.env.STAGE === 'test'
      //     ? undefined
      //     : {
      //         mechanism: 'plain',
      //         password: process.env.KAFKA_CLIENT_PASSWORD || 'user', //process.env.KAFKA_CLIENT_PASSWORDS,
      //         username: process.env.KAFKA_CLIENT_USER || 'password', //process.env.KAFKA_CLIENT_USERS,
      //       },
    })
    this.producer = this.kafka.producer()
    this.kafkaTopic = 'mysql_events'
    this.pgNotificationsChannel = 'notifications'
  }

  // Inicializar el servicio
  async init() {
    try {
      await this.producer.connect()
      console.log('Kafka producer connected')

      await this.createNotificationTable()

      await this.createTriggers()
    } catch (error) {
      console.error('Error initializing MySQLService:', error)
    }
  }

  async shutdown() {
    await this.producer.disconnect()
    await this.pool.end()
    console.log('MySQLService shut down')
  }

  // Crear la tabla de notificaciones
  async createNotificationTable() {
    const connection = await this.pool.getConnection()
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS notifications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          table_name VARCHAR(255),
          updated_at DATETIME
        );
      `)
      console.log('Notifications table created or already exists')
    } catch (error) {
      console.error('Error creating notifications table:', error)
    } finally {
      connection.release()
    }
  }

  // Crear triggers para insertar notificaciones
  async createTriggers() {
    const connection = await this.pool.getConnection()
    try {
      const tables = [
        'product',
        'unit_measurement',
        'category_food',
      ] // Tablas relevantes

      for (const table of tables) {
        // Crear un trigger para cada tabla que nos interese
        const triggerQueryCreate = `
          CREATE TRIGGER IF NOT EXISTS ${table}_after_insert
          AFTER INSERT ON ${table}
          FOR EACH ROW
          BEGIN
            INSERT INTO notifications (table_name, updated_at)
            VALUES ('${table}', NOW());
          END;
        `
        const triggerQueryUpdate = `
          CREATE TRIGGER IF NOT EXISTS ${table}_after_update
          AFTER UPDATE ON ${table}
          FOR EACH ROW
          BEGIN
            INSERT INTO notifications (table_name, updated_at)
            VALUES ('${table}', NOW());
          END;
        `
        await connection.query(triggerQueryCreate)
        await connection.query(triggerQueryUpdate)
        console.log(`Trigger created for table: ${table}`)
      }
    } catch (error) {
      console.error('Error creating triggers:', error)
    } finally {
      connection.release()
    }
  }

  // Consultar las notificaciones
  async fetchNotifications() {
    const connection = await this.pool.getConnection()
    try {
      const [rows] = await connection.query('SELECT * FROM notifications')
      for (const row of rows) {
        await this.emitEventToKafka(row.table_name, row.updated_at)
      }

      // Limpiar las notificaciones procesadas
      await connection.query('DELETE FROM notifications')
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      connection.release()
    }
  }

  // Enviar eventos a Kafka
  async emitEventToKafka(table: string, updatedAt: any) {
    try {
      await this.producer.connect()

      await this.producer.send({
        topic: this.kafkaTopic,
        messages: [
          {
            value: JSON.stringify({
              table,
              updatedAt,
              env: process.env.STAGE,
            }),
          },
        ],
      })
      console.log(`Event sent to Kafka for table: ${table} at ${updatedAt}`)
    } catch (error) {
      console.error('Error sending event to Kafka:', error)
    }
  }

  async syncDatabase() {
    let connection
    try {
      // Conexión a la base de datos MySQL
      connection = await this.pool.getConnection()

      const [rows] = await connection.execute(
        `SELECT table_name FROM information_schema.tables 
         WHERE table_schema = ? AND table_name NOT LIKE '%-%' AND table_name != 'migrations'`,
        [process.env.DB_NAME],
      )
      const tableNames = rows.map((row: any) => row.TABLE_NAME)

      // Conexión al productor de Kafka
      await this.producer.connect()

      for (const tableName of tableNames) {
        const message = {
          table: tableName,
          updatedAt: '1970-01-26 05:06:56.712459', // Fecha por defecto
          env: process.env.STAGE,
        }

        // Enviar mensaje a Kafka
        await this.producer.send({
          topic: this.kafkaTopic,
          messages: [{ value: JSON.stringify(message) }],
        })
        console.log(`Mensaje enviado a Kafka para la tabla: ${tableName}`)
      }
    } catch (error) {
      console.error('Error sincronizando la base de datos:', error)
      throw error
    } finally {
      // Liberamos la conexión a MySQL
      connection.release()
      // Cerramos la conexión del productor de Kafka
      await this.producer.disconnect()
    }
  }
}

export default MySQLService
