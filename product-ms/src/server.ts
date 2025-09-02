import express, { Application } from "express";
// import { routes } from "./routes";
import cors from "cors";
import { createServer } from "http";
import { loadRoutes } from "./common/routes";
import { Express } from "express";
import { AppDataSource } from "./common/data-access/data-source";
import { allExceptionsHandler } from "./common/middlewares/all-exceptions.filter";
import { responseInterceptor } from "./common/middlewares/response.interceptor";
import MySQLService from "./common/services/mysql-service";

class Server {
  private app: Express;
  private port: string;
  private server: any;
  private mysqlServiceInstance: MySQLService;

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "3000";

    this.server = createServer(this.app);

    this.middlewares();

    loadRoutes(this.app);

    this.initAppDataSource();

    this.app.use(allExceptionsHandler);

    this.mysqlServiceInstance = new MySQLService();

    this.initMysqlService();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(responseInterceptor);
  }

  async initAppDataSource() {
    await AppDataSource.initialize();
  }

  async initMysqlService() {
    try {
      if (process.env.STAGE !== "dev") {
        // Inicializa el servicio MySQL y crea los triggers
        await this.mysqlServiceInstance.init();

        await this.mysqlServiceInstance.syncDatabase();

        // Consultar las notificaciones cada 10 segundos
        setInterval(() => {
          this.mysqlServiceInstance.fetchNotifications();
        }, 10000);
      }
    } catch (error) {
      const e = new Error();
      e.message = "Error starting MySQLService";
      throw e;
    }
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server product-ms running on port: ${this.port}`);
    });
  }
}

export default Server;
