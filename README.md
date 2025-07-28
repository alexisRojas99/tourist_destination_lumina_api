# Tourist Destination Lumina API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A comprehensive REST API for managing tourist destinations in El Salvador, built with NestJS, TypeScript, and PostgreSQL.

## 🚀 Features

- **RESTful API** with comprehensive CRUD operations for destinations
- **Swagger Documentation** with examples and response schemas
- **PostgreSQL Database** with Sequelize ORM
- **Docker Support** for easy deployment and development
- **Health Checks** for monitoring application status
- **Input Validation** with class-validator
- **TypeScript** for type safety and better development experience

## 📋 Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## 🛠️ Project Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/alexisRojas99/tourist_destination_lumina_api.git
   cd tourist_destination_lumina_api
   ```

2. **Start the database**

   ```bash
   npm run docker:database:up
   ```

3. **Build and start the web service**

   ```bash
   npm run docker:build
   ```

   Or just start (if already built):

   ```bash
   npm run docker:up
   ```

### Option 2: Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database configuration
   ```

3. **Start PostgreSQL database**

   ```bash
   npm run docker:database:up
   ```

4. **Run the application**4. **Run the application**

   ```bash
   # development mode
   npm run start:dev

   # production mode
   npm run start:prod
   ```

## 🐳 Docker Commands

| Command                      | Description                              |
| ---------------------------- | ---------------------------------------- |
| `npm run docker:database:up` | Start PostgreSQL database in Docker      |
| `npm run docker:build`       | Build and start the web service          |
| `npm run docker:up`          | Start the web service (if already built) |

## 📖 API Documentation

Once the application is running, you can access:

- **API Base URL**: `http://localhost:8000/api/v1`
- **Swagger Documentation**: `http://localhost:8000/api/v1/docs`
- **Health Check**: `http://localhost:8000/api/v1/health`

## 🏗️ API Endpoints

### Destinations

- `GET /api/v1/destinations` - Get all destinations
- `GET /api/v1/destinations/:id` - Get destination by ID
- `POST /api/v1/destinations` - Create new destination
- `PATCH /api/v1/destinations/:id` - Update destination
- `DELETE /api/v1/destinations/:id` - Soft delete destination

### Health

- `GET /api/v1/health` - Application health check

## 🧪 Testing

## 🧪 Testing

```bash
# unit tests
npm run test

# watch mode
npm run test:watch

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 🗄️ Database Management

### Migrations

```bash
# Generate migration
npm run migration:generate -- migration-name

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Revert all migrations
npm run migration:revert-all
```

### Seeds

```bash
# Generate seed
npm run seed:generate -- seed-name

# Run all seeds
npm run seed:run

# Revert all seeds
npm run seed:revert
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=8000
API_PREFIX=api/v1
APP_NAME=Tourist Destination Lumina API
APP_VERSION=1.0.0

# Database
DB_HOST=localhost
DB_PORT=5432
DB_MOTOR=postgres
DB_NAME=el_salvador_dev
DB_USERNAME=develop
DB_PASSWORD=dev$123
```

## 📁 Project Structure

```
src/
├── common/              # Shared utilities and DTOs
│   ├── dto/            # Data Transfer Objects
│   ├── filters/        # Exception filters
│   └── interceptors/   # Request/Response interceptors
├── config/             # Configuration files
├── modules/            # Feature modules
│   ├── destinations/   # Destinations module
│   ├── health/        # Health check module
│   └── users/         # Users module (if applicable)
└── main.ts            # Application entry point
```

## 🚀 Deployment

### Using Docker

1. **Build the production image**

   ```bash
   docker build -t tourist-destination-api .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🛠️ Development Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **TypeScript**: Type checking
- **Swagger**: API documentation

## 📝 License

This project is [MIT licensed](LICENSE).

## 👨‍💻 Author

**Alexis Rojas**

- GitHub: [@alexisRojas99](https://github.com/alexisRojas99)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
