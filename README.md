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



### Stopping the Application

```bash
# Stop and remove containers
docker-compose down

# Stop containers (keep data)
docker-compose stop

# Remove volumes (including database data)
docker-compose down -v
```



## License

This project is open source and available under the [MIT License](LICENSE).