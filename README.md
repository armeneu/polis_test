# Simple Blog with Comments

A full-stack blog application built with Laravel backend and React frontend, containerized with Docker.

## Features

- **Backend (Laravel)**: REST API for articles and comments
- **Frontend (React)**: Responsive UI with article listing and commenting
- **Database**: MySQL with migrations and seed data
- **Docker**: Containerized development environment with automatic dependency installation

### API Endpoints

- `GET /api/articles` - List all articles
- `GET /api/articles/{id}` - Get single article with comments
- `POST /api/articles` - Create new article
- `POST /api/articles/{id}/comments` - Add comment to article

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development without Docker)
- PHP 8.2+ (for local development without Docker)
- Composer (for local development without Docker)

## Quick Start with Docker

1. **Start the application**
   ```bash
   docker-compose up -d
   ```

2. **For new server deployments (rebuilds the images)**
   ```bash
   docker-compose up -d --build
   ```

3. **Run database migrations (if needed)**
   ```bash
   docker-compose exec backend php artisan migrate
   ```

4. **Reset and seed database (useful for new deployments)**
   ```bash
   docker-compose exec backend php artisan migrate:fresh --seed
   ```

5. **Access the application**
   - Application: http://localhost:8000
   - Backend API: http://localhost:8000/api
   - MySQL: localhost:3306

**Note**: Dependencies (PHP packages, Node.js modules) are automatically installed during the Docker container startup. Database migrations and seeders are also automatically executed.

## Manual Setup (without Docker)

### Backend Setup

1. **Install PHP dependencies**
   ```bash
   composer install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Update database configuration in `.env`**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=blog_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

4. **Run migrations and seeding**
   ```bash
   php artisan migrate --seed
   ```

5. **Install npm dependencies and build frontend**
   ```bash
   npm install
   npm run build
   ```

6. **Start the development server**
   ```bash
   php artisan serve
   ```

## Database Commands

### With Docker
```bash
# Run migrations (automatically done on first start)
docker-compose exec backend php artisan migrate

# Run migrations with seeding (automatically done on first start)
docker-compose exec backend php artisan migrate --seed

# Fresh migrations with seeding
docker-compose exec backend php artisan migrate:fresh --seed

# Rollback migrations
docker-compose exec backend php artisan migrate:rollback

# Create new migration
docker-compose exec backend php artisan make:migration create_table_name

# Run seeder only
docker-compose exec backend php artisan db:seed
```

### Without Docker
```bash
# Run migrations
php artisan migrate

# Run migrations with seeding
php artisan migrate --seed

# Fresh migrations with seeding
php artisan migrate:fresh --seed

# Rollback migrations
php artisan migrate:rollback

# Create new migration
php artisan make:migration create_table_name

# Run seeder only
php artisan db:seed
```

## Development Commands

```bash
# Build frontend assets
docker-compose exec backend npm run build

# Run development server (with hot reload)
docker-compose exec backend npm run dev

# Install npm dependencies
docker-compose exec backend npm install
```

## Project Structure

```
polis_test/
├── app/                    # Laravel application
│   ├── Models/            # Article and Comment models
│   └── Http/Controllers/  # API controllers
├── resources/
│   ├── js/                # React frontend
│   │   ├── components/    # React components
│   │   ├── types.ts       # TypeScript interfaces
│   │   ├── api.ts         # API service
│   │   └── app.tsx        # Main React app
│   ├── css/               # CSS files
│   └── views/             # Blade templates
├── routes/
│   ├── web.php            # Frontend routes
│   └── api.php            # API routes
├── database/
│   ├── migrations/        # Database migrations
│   ├── factories/         # Model factories
│   └── seeders/           # Database seeders
├── storage/               # Storage directory
├── backend.Dockerfile     # Docker configuration
├── nginx-backend.conf     # Nginx configuration
├── docker-compose.yml     # Docker compose configuration
├── init.sh                # Initialization script for Docker
├── package.json           # Frontend dependencies
├── composer.json          # PHP dependencies
└── .env                   # Environment configuration
```

## API Documentation

### Articles

#### Get All Articles
```http
GET /api/articles
```

Response:
```json
[
  {
    "id": 1,
    "title": "Welcome to Our Blog",
    "content": "Article content...",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z",
    "comments": []
  }
]
```

#### Get Single Article
```http
GET /api/articles/{id}
```

Response:
```json
{
  "id": 1,
  "title": "Welcome to Our Blog",
  "content": "Article content...",
  "created_at": "2024-01-01T00:00:00.000000Z",
  "updated_at": "2024-01-01T00:00:00.000000Z",
  "comments": [
    {
      "id": 1,
      "article_id": 1,
      "author_name": "John Doe",
      "content": "Great article!",
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

#### Create Article
```http
POST /api/articles
Content-Type: application/json

{
  "title": "New Article",
  "content": "Article content..."
}
```

Response:
```json
{
  "title": "New Article",
  "content": "Article content...",
  "updated_at": "2024-01-01T00:00:00.000000Z",
  "created_at": "2024-01-01T00:00:00.000000Z",
  "id": 2
}
```

### Comments

#### Add Comment to Article
```http
POST /api/articles/{id}/comments
Content-Type: application/json

{
  "author_name": "John Doe",
  "content": "Great article!"
}
```

Response:
```json
{
  "article_id": 1,
  "author_name": "John Doe",
  "content": "Great article!",
  "updated_at": "2024-01-01T00:00:00.000000Z",
  "created_at": "2024-01-01T00:00:00.000000Z",
  "id": 1
}
```

## Development

### Running Tests

```bash
# Backend tests
docker-compose exec backend php artisan test

# Frontend tests
npm test
```

### Debugging

```bash
# View logs
docker-compose logs backend
docker-compose logs nginx
docker-compose logs mysql

# Access containers
docker-compose exec backend bash
docker-compose exec mysql mysql -u blog_user -p blog_db
```

### Stopping the Application

```bash
# Stop and remove containers
docker-compose down

# Stop containers (keep data)
docker-compose stop

# Remove volumes (including database data)
docker-compose down -v
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `docker-compose.yml` if 8000 or 3306 are already in use
2. **Database connection errors**: Ensure MySQL container is running and environment variables are correct
3. **Asset build errors**: Run `npm install` and `npm run build` to rebuild frontend assets
4. **Missing dependencies**: Dependencies are automatically installed during Docker container startup

### Reset Database

```bash
# With Docker
docker-compose exec backend php artisan migrate:fresh --seed

# Build frontend assets after changes
docker-compose exec backend npm run build

# Without Docker
php artisan migrate:fresh --seed
npm run build
```

## Recent Improvements

### Docker Improvements
- Automatic installation of PHP and Node.js dependencies during container startup
- Automatic database migration and seeding on first run
- Improved handling of Node.js version compatibility issues
- Fixed issues with rollup module architecture compatibility

### Code Improvements
- Fixed UserFactory to properly use Faker instance
- Enhanced error handling in React components
- Improved database connection handling

## License

This project is open source and available under the [MIT License](LICENSE).