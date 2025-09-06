# Reports MS

## Descripción

- Microservicio para la gestion de reportes

## Tecnologías utilizadas

- Symfony2.8/php7.2

## Instalación y configuración

1. **Congigurar para Docker**

 - Crear un doker-compose.yml en la raíz y copiar:

 php:
    build: .
    container_name: reports_php
    volumes:
      - ./:/var/www/html
    environment:
      - WAREHOUSE_MS_URL=http://localhost:4000/graphql
      - STORE_MS_URL=http://localhost:4001/api
  nginx:
    build: .
    container_name: reports_nginx
    ports:
      - "8088:80"
    depends_on: [php]
    volumes:
      - ./:/var/www/html     

2. **Iniciar los contenedores con Docker Compose**

   ```bash
   docker-compose up -d

   ```

## Descripción de la arquitectura general

El proyecto está desarrollado con Symfony 2.8, un framework PHP basado en el patrón MVC (Modelo–Vista–Controlador) y en el uso intensivo de componentes desacoplados.

La arquitectura general se organiza de la siguiente manera:

- AppBundle / Módulos → cada bundle encapsula una funcionalidad específica del sistema.

- Controllers → reciben las peticiones HTTP, gestionan la lógica de enrutamiento y coordinan la respuesta adecuada.

- Services → contienen la lógica de negocio reutilizable, inyectados en los controladores mediante el service container de Symfony.

- Routing → define las URLs del sistema y las asocia con los controladores correspondientes.


## Dependencias clave del proyecto

El proyecto se apoya en varias dependencias esenciales proporcionadas por Symfony y por librerías externas. Las más relevantes son:

- PHP 7.2 → Lenguaje de programación base.

- Symfony 2.8 → Framework principal que provee la estructura MVC y los componentes fundamentales (HttpKernel, Routing, DependencyInjection, EventDispatcher, etc.).

- Composer → Gestor de dependencias para PHP, encargado de instalar y autoloadear las librerías necesarias.

- Monolog → Sistema de logging configurable para registrar errores y eventos de la aplicación.
