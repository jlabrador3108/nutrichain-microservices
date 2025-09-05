FROM php:7.2-fpm

# Configurar repos archivados
RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list \
 && sed -i 's|security.debian.org|archive.debian.org|g' /etc/apt/sources.list \
 && sed -i '/updates/d' /etc/apt/sources.list

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    libicu-dev libzip-dev git unzip libpng-dev libonig-dev \
 && docker-php-ext-install intl mbstring zip opcache \
 && docker-php-ext-enable intl mbstring zip opcache

# Composer desde la imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN pecl install xdebug-2.9.8 \
    && docker-php-ext-enable xdebug

# Carpeta de trabajo
WORKDIR /var/www/html

COPY . /var/www/html

RUN composer self-update --1
RUN composer install --no-interaction --optimize-autoloader --no-dev

RUN mkdir -p var/cache var/logs \
    && chown -R www-data:www-data var

# Exponer puerto FPM
EXPOSE 9000

# Comando por defecto
CMD ["php-fpm"]    


