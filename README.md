# Nutrichain MS

## Descripción

- API de varios microservicios para la gestion de una empresa logística especializada en alimentos, desde la gestión del catálogo hasta la entrega del producto, pasando por validaciones sanitarias, control de stock y generación de documentos formales.

## Tecnologías utilizadas

- Nodejs/Nestjs
- Nodejs/Express
- Docker
- GraphQL
- Mysql
- MongoDB
- Elasticsearch
- TypeOrm
- Prisma
- Redis

## Instalación y configuración

1. **Clonar el repositorio**

   ```bash
   git clone <REPOSITORY_URL>
   cd <PROJECT_NAME>

   ```

2. **Iniciar los contenedores con Docker Compose**

   ```bash
   docker-compose up -d

   ```

3. **Acceder a MongoDB y configurar el Replica Set**

   ```bash
    docker exec -it warehouse_mongodb mongosh
   ```

   - Luego ejecutar

   ```bash
    rs.initiate({
   _id: "rs0",
   members: [{ _id: 0, host: "mongodb:27017" }]
   })
   ```

4. **Reiniciar los contenedores**

- Reiniciar los contenedores: product_ms, warehouse_ms, store_ms
- Verificar que todos los contenedores esten corriendo

5. **Documentación Swagger**

- en http://localhost:5000/docs (o puerto modificado)

6. **Test en Postman**

- Puede importar en post el archivo `test treew inc.postman_collection.json` localizado en la raíz del proyecto

Nota: En el microservicio Warehouse el cual contiene GraphQL(http://localhost:4000/graphql) se puede acceder a esta url por Postman con una request de GraphQL y se obseran las diferentes funcionalidades creadas

- En algunos request fijarse en el puerto

7. Demas documentos requeridos en la raíz del proyecto

- Nota: 1. dejo los .env ya que no tienen contenido crítico 
     


### datos insertados en los seeds automaticos

categories = [
{ name: "refrigerados" },
{ name: "secos" },
{ name: "congelados" },
];

units = [
{ name: "Kilogram", abbreviation: "kg" },
{ name: "Liter", abbreviation: "l" },
{ name: "Piece", abbreviation: "pcs" },
];

products = [
{
name: "Manzana",
description: "Manzanas frescas",
sku: "manzana-001",
weight: 1,
},
{
name: "Pollo",
description: "Pollo congelado",
sku: "pollo-001",
weight: 5,
},
];

stocks = [
{
productSku: "pollo-001",
quantity: 100,
},
{
productSku: "manzana-001",
quantity: 100,
},
],

warehouses = [
{
name: "Almacen 1",
manager: "Alberto",
location: {
address: "Calle Falsa 123",
lat: 20.45678,
lon: 20.45678,
},
},
{
name: "Almacen 2",
manager: "Juan",
location: {
address: "Calle Falsa 456",
lat: 20.45678,
lon: 20.45678,
},
},
];

### Casos de uso

Implementar una arquitectura basada en microservicios para un ecosistema de
retail distribuido. Cada dominio (catálogo, stock físico, reportes, pedidos) debe
operar de forma desacoplada pero sincronizada, asegurando integridad del stock
en tiempo real y trazabilidad completa de las transacciones.

✅ Requisitos Funcionales Detallados

 Microservicio Catálogo:
o Crear, editar y consultar productos.
o Validaciones de campos: unicidad de código, peso mayor a cero,
imagen válida.
o Endpoint para listar productos con filtros por categoría y nombre.

 Microservicio Almacén:
o Registrar entradas y salidas de producto.
o Consultar stock total por producto y almacén.
o Validar que no se puedan hacer salidas si el stock es insuficiente.

 Microservicio Tienda:
o Crear pedidos con múltiples productos.
o Validar disponibilidad antes de confirmar pedido.
o Enviar evento a Almacén para descontar stock.

 Microservicio de Reportes:
o Stock Total en almacen y tienda por cada producto y almacen
o Pedidos realizados en un rango de tiempo especifico
o Histórico de entradas y salidas de un producto dado un rango de
fechas

 Integración entre microservicios:
o Comunicación por REST usando JSON.
o Contratos claros de respuesta, con manejo de errores comunes.

 Extras:
o Uso opcional de Redis como cola para pedidos.
o Documentación en Swagger u OpenAPI obligatoria por servicio.

Descripción del Negocio
NutriChain Logistics es una empresa especializada en la gestión logística de
productos alimenticios, tanto frescos como procesados, que opera dentro de un
ecosistema distribuido compuesto por múltiples centros de distribución, cámaras
frigoríficas y almacenes regionales. La compañía se encarga de coordinar de
manera eficiente el abastecimiento, almacenamiento, traslado y entrega de
productos, asegurando altos estándares de trazabilidad, control sanitario y
precisión operativa. Su sistema logístico reproduce escenarios reales en los que
participan distintas entidades y procesos interconectados, diseñados para
representar fielmente la operación de un entorno de producción robusto,
incluyendo validación de datos, eventos trazables y persistencia coherente.
El catálogo de productos administrado por NutriChain Logistics contiene
información esencial como nombre, SKU único, unidad de medida, peso, categoría
alimentaria (por ejemplo: refrigerados, secos o congelados), imágenes para
facilitar la identificación visual, y descripciones completas que permiten una
adecuada clasificación y manipulación. Estos productos se almacenan en distintas
instalaciones físicas que forman parte de la red de almacenes de la empresa, cada
una identificada con un nombre, una ubicación geográfica precisa (que puede
incluir coordenadas o direcciones físicas), y, cuando es aplicable, un responsable
asignado. La diversidad de almacenes permite gestionar productos según sus
requisitos de conservación y facilita la planificación del abastecimiento según
zonas geográficas o volúmenes de demanda.
En el día a día operativo, los productos experimentan movimientos logísticos
diversos: ingresos por abastecimiento, salidas por pedidos, devoluciones,
transferencias entre almacenes, e incluso ajustes por pérdidas, daños o sobrantes.
Cada movimiento queda registrado con detalles como el identificador del
producto, la cantidad manipulada, el tipo de movimiento (entrada, salida,
devolución o transferencia), la fecha y los almacenes de origen y destino
implicados. Estos datos no solo alimentan el historial de trazabilidad sino que
actualizan en tiempo real el stock actual, que se mantiene por producto y por
almacén, reflejando la cantidad total disponible para despacho. Esta visibilidad
inmediata del inventario permite validar pedidos con precisión, evitar
sobreasignaciones y garantizar un servicio continuo.
Las operaciones de expedición son críticas dentro del modelo de negocio, ya que
implican el traslado físico de productos alimenticios entre instalaciones logísticas o
hacia clientes. Para cada expedición se registran elementos clave como el almacén
de origen y destino, el operador a cargo (quien puede ser preparador,
transportista o receptor), el vehículo asignado (con su tipo, placa y capacidad), y la
fecha exacta de salida. Los productos se embalan en cajas identificadas
individualmente, con fecha de armado y lista detallada de contenidos, incluyendo
producto y cantidad. Cada expedición se documenta con un Vale de Entrega que
contiene número de seguimiento, información de almacenes involucrados,
resumen del contenido por caja, fecha y hora de despacho, nombre del operador
responsable y espacio  para las firmas de entrega y recepción, garantizando el
cumplimiento de requisitos legales, sanitarios y logísticos.
Dentro de los procesos de control y ajuste de inventario, el sistema permite
registrar eventos como pérdidas, sobrantes o daños. Cada ajuste debe indicar el
tipo (por ejemplo, daño o pérdida), el motivo específico, el producto afectado, la
cantidad, la fecha del evento, y los usuarios que lo registran y aprueban.
Asimismo, se contempla la reconciliación de inventario mediante comparaciones
entre el stock físico y el teórico; en caso de discrepancias, se documenta un
justificante que permita respaldar las diferencias y tomar decisiones correctivas.
Este tipo de mecanismos es fundamental para mantener la confiabilidad del
inventario y cumplir con auditorías internas o externas.
NutriChain también maneja pedidos simulados provenientes de clientes ficticios
(representados por un ID o nombre de cliente), que incluyen la fecha de solicitud y
una lista de productos con cantidades. Estos pedidos deben pasar por validaciones
automáticas de disponibilidad de stock, asegurando que los productos estén
efectivamente disponibles en el almacén correspondiente. El sistema contempla
además validaciones de concurrencia para evitar errores derivados de operaciones
simultáneas que afecten el mismo inventario.
En conjunto, este entorno permite simular todas las operaciones críticas de una
empresa logística especializada en alimentos, desde la gestión del catálogo hasta
la entrega del producto, pasando por validaciones sanitarias, control de stock y
generación de documentos formales. El sistema está diseñado con la lógica y
coherencia necesarias para ser llevado a un entorno de producción real, y puede
utilizarse como base para el desarrollo de plataformas logísticas inteligentes,
pruebas de automatización, o soluciones basadas en inteligencia artificial.
