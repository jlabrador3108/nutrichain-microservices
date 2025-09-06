# Warehouse MS

## Descripción

- Microservicio para la gestion de almacenes e inventarios

## Tecnologías utilizadas

- Nodejs/Express
- GraphQL
- MongoDB
- Prisma

## Instalación y configuración

1. **Instalar dependencias**

   ```bash
   cd warehouse-ms
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

5. **Correr seeds**

   ```bash
   yarn run seed

   ```

6. **Ejecutar proyecto**

   ```bash
   yarn start:dev

   ```   


## Descripción de la arquitectura general

El proyecto utiliza una arquitectura modular, donde cada módulo representa una funcionalidad del dominio de negocio.
Dentro de cada módulo se encuentran:

- Controllers → manejan las peticiones HTTP o las integraciones con Apollo Server.

- GraphQL Resolvers → definen la lógica de resolución de queries y mutations del esquema GraphQL.

- Services → contienen la lógica de negocio y actúan como capa intermedia entre los resolvers/controllers y la base de datos.

- Prisma Client → gestiona la comunicación con la base de datos de manera tipada y segura.

- Apollo Server se integra con Express para exponer el endpoint GraphQL, mientras que Prisma abstrae el acceso a la base de datos.


## Dependencias clave del proyecto

- @prisma/client → Cliente de Prisma para interactuar con la base de datos de forma segura y tipada.

- apollo-server-express → Framework que integra Apollo Server con Express para levantar un servidor GraphQL.

- express → Framework minimalista de Node.js para manejar peticiones HTTP y middlewares.

- graphql → Librería que define los tipos, esquemas y herramientas base para GraphQL.

- nodemon → Utilidad para desarrollo que reinicia automáticamente el servidor cuando hay cambios en el código.
