# Product MS

## Descripción

- Microservicio para la gestion de productos

## Tecnologías utilizadas

- Nodejs/Express(ts)
- Elasticsearch
- Mysql
- TypeOrm

## Instalación y configuración

1. **Instalar dependencias**

   ```bash
   cd product-ms
   yarn install

   ```

2. Cambiar variables en .env de ser requerido

3. **Correr migraciones**

   ```bash
   yarn migration:run

   ```

4. **Correr seeds**

   ```bash
   yarn run seed

   ```

5. **Ejecutar proyecto**

   ```bash
   yarn start:dev

   ```   


## Descripción de la arquitectura general

El proyecto está desarrollado en Node.js con TypeScript y sigue una arquitectura modular, donde cada módulo encapsula una funcionalidad del dominio.

La organización es la siguiente:

- Controllers → reciben las peticiones HTTP desde las rutas y actúan como punto de entrada a la lógica del negocio.

- Routes → definen los endpoints y se encargan de mapear las peticiones a los controladores correspondientes.

- Services → implementan la lógica de negocio, coordinan interacciones entre controladores, modelos, bases de datos y servicios externos.

- Models (TypeORM Entities) → representan las tablas de la base de datos y se gestionan mediante TypeORM.

- TypeORM + MySQL → proveen el acceso a la base de datos relacional con un ORM robusto y tipado.

- Kafka (kafkajs) → permite la comunicación asíncrona entre servicios a través de mensajería distribuida.

- Elasticsearch → integra búsquedas y análisis avanzados sobre grandes volúmenes de datos.

- Zod → se usa para validar datos entrantes en controladores y servicios.


## Dependencias clave del proyecto

- @elastic/elasticsearch → Cliente oficial de Elasticsearch para consultas y operaciones de indexación.

- @tsconfig/node22 → Configuración base recomendada de TypeScript para Node.js 22.

- @types/cors, @types/express, @types/node → Definiciones de tipos para trabajar con Express, CORS y Node.js en TypeScript.

- cors → Middleware que habilita Cross-Origin Resource Sharing en la API.

- dotenv → Manejo de variables de entorno a través de archivos .env.

- express → Framework minimalista para levantar la API REST y manejar middlewares.

- http → Librería HTTP (wrapper mínima, usada generalmente como dependencia de seguridad o compatibilidad).

- kafkajs → Cliente moderno de Kafka para Node.js, usado en la gestión de eventos y mensajería distribuida.

- mysql2 → Driver MySQL compatible y de alto rendimiento para Node.js, usado junto con TypeORM.

- reflect-metadata → Requerido por TypeORM y decorators en TypeScript para manejar metadatos en clases y entidades.

- ts-node / ts-node-dev → Ejecutan proyectos en TypeScript directamente sin compilación previa; ts-node-dev añade recarga en caliente para desarrollo.

- tsconfig-paths → Permite resolver alias y rutas personalizadas definidas en tsconfig.json.

- typeorm → ORM que conecta la aplicación con la base de datos MySQL, gestionando entidades, migraciones y repositorios.

- typescript → Lenguaje principal para el desarrollo del proyecto.

- zod → Librería para validación de datos y definición de esquemas tipados.
