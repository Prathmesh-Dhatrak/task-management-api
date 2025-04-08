# Task Management API

A RESTful API for task management with JWT authentication built using Node.js, Express, TypeScript, Prisma and MongoDB.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- MongoDB (Database)
- Zod (Validation)
- JWT (Authentication)
- Yarn (Package Manager)

## Project Structure

```
task-management-api/
├── src/
│   ├── config/              # App configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Prisma client and model interfaces
│   ├── routes/              # API routes
│   ├── schemas/             # Validation schemas
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── app.ts               # Express application setup
│   └── server.ts            # Application entry point
├── prisma/
│   └── schema.prisma        # Database schema
├── tests/                   # Test files
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

1. Clone the repository
2. Install dependencies
   ```bash
   yarn install
   ```
3. Configure environment variables
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string and JWT secret
4. Generate Prisma client
   ```bash
   yarn prisma:generate
   ```
5. Push schema to database
   ```bash
   yarn prisma:push
   ```

## Running the API

### Development Mode
```bash
yarn dev
```

### Production Build
```bash
yarn build
yarn start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "User Name", "email": "user@example.com", "password": "password123" }`

- `POST /api/auth/login` - Login a user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Tasks

All task routes require authentication via Bearer token in the Authorization header.

- `GET /api/tasks` - Get all tasks for the authenticated user

- `GET /api/tasks/:id` - Get a specific task by ID

- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "Task title", "description": "Task description", "status": "pending" }`

- `PATCH /api/tasks/:id` - Update a task
  - Body: `{ "title": "Updated title", "description": "Updated description", "status": "completed" }`

- `DELETE /api/tasks/:id` - Delete a task

## Status Options

Task status can be one of:
- `pending`
- `in-progress`
- `completed`

## Error Handling

The API returns appropriate HTTP status codes and error messages in a consistent format:

```json
{
  "status": "error",
  "message": "Error message description"
}
```

## Validation

Input validation is performed using Zod schemas. Invalid requests will return a 400 status code with detailed error messages.

## Authentication Flow

1. User registers or logs in
2. Server returns a JWT token
3. Client includes the token in the Authorization header for protected routes
   - Format: `Authorization: Bearer <token>`
