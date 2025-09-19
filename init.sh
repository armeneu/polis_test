#!/bin/bash

echo "Initializing the application..."

# Check if vendor directory exists and is not empty
if [ ! -d "vendor" ] || [ -z "`ls -A vendor`" ]; then
    echo "Installing PHP dependencies..."
    composer install --no-dev --optimize-autoloader
    if [ $? -ne 0 ]; then
        echo "Failed to install PHP dependencies"
        exit 1
    fi
else
    echo "PHP dependencies already installed."
fi

# Check if node_modules directory exists and is not empty
if [ ! -d "node_modules" ] || [ -z "`ls -A node_modules`" ]; then
    echo "Installing Node.js dependencies..."
    # Remove package-lock.json and node_modules if they exist to avoid npm bug
    rm -rf package-lock.json node_modules
    # Install with specific platform flags to avoid rollup issues
    npm install --platform=linux --arch=x64
    if [ $? -ne 0 ]; then
        echo "Failed to install Node.js dependencies"
        exit 1
    fi
else
    echo "Node.js dependencies already installed."
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
else
    echo ".env file already exists."
fi

echo "Building frontend assets..."
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build frontend assets"
    # Try again after cleaning node_modules with specific flags
    echo "Retrying after cleaning node_modules..."
    rm -rf package-lock.json node_modules
    npm install --platform=linux --arch=x64
    npm run build
    if [ $? -ne 0 ]; then
        echo "Failed to build frontend assets even after cleaning"
        # Continue anyway since we can still run migrations
    fi
fi

echo "Running database migrations and seeders..."
php artisan migrate --seed --force
if [ $? -ne 0 ]; then
    echo "Failed to run database migrations and seeders"
    exit 1
fi

echo "Initialization complete! Starting PHP-FPM..."
exec php-fpm