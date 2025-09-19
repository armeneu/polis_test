FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Install a specific version of Node.js to avoid architecture issues
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files first for better caching
COPY composer.json composer.lock ./ 

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy existing application directory contents
COPY ./ /var/www/

# Copy init script and make it executable
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Install npm dependencies with specific flags to avoid rollup issues
RUN npm install --platform=linux --arch=x64

# Run post-install scripts
RUN composer dump-autoload

# Change ownership of all files to www-data
RUN chown -R www-data:www-data /var/www

# Expose port 9000 and start init script
EXPOSE 9000
CMD ["/usr/local/bin/init.sh"]