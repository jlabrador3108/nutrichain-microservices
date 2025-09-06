# Store MS

## Descripción

- Microservicio para la gestion de pedidos

## Tecnologías utilizadas

- Nodejs/Express
- MongoDB
- Prisma
- Redis

## Instalación y configuración

1. **Instalar dependencias**

   ```bash
   cd store-ms
   yarn install

   ```

2. Cambiar variables en .env de ser requerido

3. **Generar configuración para prisma**

   ```bash
   npx prisma generate

   ```

4. **Establecer la configuración en la base de datos**

   ```bash
   npx prisma db push

   ```

5. **Ejecutar proyecto**

   ```bash
   yarn start:dev

   ```   


## Descripción de la arquitectura general

El proyecto está desarrollado con Node.js y sigue una arquitectura modular, donde cada módulo agrupa la lógica relacionada a una funcionalidad específica del sistema.

La organización es la siguiente:

- Controllers → manejan las peticiones entrantes (HTTP), reciben datos de las rutas y delegan la lógica a los servicios.

- Routes → definen los endpoints de la API y los asocian con los controladores correspondientes.

- Services → implementan la lógica de negocio, encapsulando las operaciones principales (consultas, validaciones, integración con colas, etc.).

- Prisma Client (@prisma/client) → actúa como capa de acceso a datos, permitiendo consultas tipadas a la base de datos.

- BullMQ + Redis (ioredis) → se usan para la gestión de tareas en segundo plano y colas de procesamiento.

- Validaciones (zod) → garantizan que la información recibida cumpla con el esquema esperado.


## Dependencias clave del proyecto
- @prisma/client → Cliente de Prisma para interactuar con la base de datos mediante un ORM moderno y tipado.

- axios → Cliente HTTP para realizar peticiones a servicios externos.

- bullmq → Librería para la creación y gestión de colas de trabajos, construida sobre Redis.

- concurrently → Permite ejecutar múltiples comandos de forma simultánea (útil en desarrollo, por ejemplo, para correr servidor y workers al mismo tiempo).

- cors → Middleware que habilita el soporte de Cross-Origin Resource Sharing en la API.

- dotenv → Manejo de variables de entorno a través de un archivo .env.

- express → Framework minimalista de Node.js para construir la API REST y gestionar middlewares.

- ioredis → Cliente de Redis de alto rendimiento, necesario para BullMQ y otras integraciones.

- nodemon → Herramienta de desarrollo que reinicia el servidor automáticamente al detectar cambios en el código.

- zod → Librería de validación y definición de esquemas para garantizar la integridad de los datos.