# Task Management API

A RESTful API for task management with JWT authentication built using Node.js, Express, TypeScript, Prisma and MongoDB.

## Features

- User registration and authentication using JWT
- Secure task creation, retrieval, updating, and deletion
- Data validation using Zod
- Type safety with TypeScript
- Database persistence with MongoDB and Prisma ORM

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
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## API Documentation

[View the complete Postman collection](https://prathmesh-space-for-work.postman.co/workspace/Prathmesh-Workspace~f93eb07f-6bd8-4f71-8a09-fcd5089ade1e/collection/10954545-757ce36e-f808-43ff-bf82-d747f146fbe7?action=share&creator=10954545)

### Deployed API

Base URL: `https://task-management-api-7zit.onrender.com`

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- Yarn package manager
- MongoDB instance (local or Atlas)

### Local Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Prathmesh-Dhatrak/task-management-api.git
   cd task-management-api
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Configure environment variables
   - Copy `.env.example` to `.env`
      ```bash
      cp .env.example .env
      ```
   - Update the MongoDB connection string and JWT secret
      ```
      PORT=3000
      NODE_ENV=development
      JWT_SECRET=your_jwt_secret_key
      JWT_EXPIRY=24h
      DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/task_management_db
      ```

4. Generate Prisma client
   ```bash
   yarn prisma:generate
   ```

5. Push schema to database
   ```bash
   yarn prisma:push
   ```

### Running the API

#### Development Mode
```bash
yarn dev
```

#### Production Build
```bash
yarn build
yarn start
```

## API Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
```

Request body:
```json
{
  "name": "SomeRandom Name",
  "email": "some-random-name@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "6123456789abcdef12345678",
      "name": "SomeRandom Name",
      "email": "some-random-name@example.com",
      "createdAt": "2023-07-01T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User

```
POST /api/auth/login
```

Request body:
```json
{
  "email": "some-random-name@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "6123456789abcdef12345678",
      "name": "SomeRandom Name",
      "email": "some-random-name@example.com",
      "createdAt": "2023-07-01T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Tasks

All task endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Create Task

```
POST /api/tasks
```

Request body:
```json
{
  "title": "Complete project",
  "description": "Finish the task management API project",
  "status": "pending"
}
```

Response:
```json
{
  "status": "success",
  "message": "Task created successfully",
  "data": {
    "id": "6123456789abcdef12345678",
    "title": "Complete project",
    "description": "Finish the task management API project",
    "status": "pending",
    "userId": "6123456789abcdef12345678",
    "createdAt": "2023-07-01T12:00:00.000Z",
    "updatedAt": "2023-07-01T12:00:00.000Z"
  }
}
```

#### Get All Tasks

```
GET /api/tasks
```

Response:
```json
{
  "status": "success",
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "6123456789abcdef12345678",
      "title": "Complete project",
      "description": "Finish the task management API project",
      "status": "pending",
      "userId": "6123456789abcdef12345678",
      "createdAt": "2023-07-01T12:00:00.000Z",
      "updatedAt": "2023-07-01T12:00:00.000Z"
    }
  ]
}
```

#### Get Task by ID

```
GET /api/tasks/:id
```

Response:
```json
{
  "status": "success",
  "message": "Task retrieved successfully",
  "data": {
    "id": "6123456789abcdef12345678",
    "title": "Complete project",
    "description": "Finish the task management API project",
    "status": "pending",
    "userId": "6123456789abcdef12345678",
    "createdAt": "2023-07-01T12:00:00.000Z",
    "updatedAt": "2023-07-01T12:00:00.000Z"
  }
}
```

#### Update Task

```
PATCH /api/tasks/:id
```

Request body:
```json
{
  "status": "in-progress"
}
```

Response:
```json
{
  "status": "success",
  "message": "Task updated successfully",
  "data": {
    "id": "6123456789abcdef12345678",
    "title": "Complete project",
    "description": "Finish the task management API project",
    "status": "in-progress",
    "userId": "6123456789abcdef12345678",
    "createdAt": "2023-07-01T12:00:00.000Z",
    "updatedAt": "2023-07-01T12:30:00.000Z"
  }
}
```

#### Delete Task

```
DELETE /api/tasks/:id
```

Response:
```json
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in a consistent format:

```json
{
  "status": "error",
  "message": "Error message description"
}
```

## Task Status Options

Task status can be one of:
- `pending` - Task is yet to be started
- `in-progress` - Task is currently being worked on
- `completed` - Task has been completed

## Deployment Details

This API is deployed on Render using a web service connected to GitHub. 

### Deployment Configuration
- **Build Command**: `yarn && yarn prisma:generate && yarn build`
- **Start Command**: `yarn start`
- **Environment Variables**: Set all required environment variables in the Render dashboard

### CI/CD

The API is set up with continuous deployment from the GitHub repository. Any push to the main branch triggers a new deployment.

## Security Considerations

- JWT tokens are used for authentication
- Passwords are hashed before storing in the database
- Environment variables are used for sensitive information
- Input validation is performed on all requests
- MongoDB connection string is protected

## License

This project is licensed under the MIT License - see the LICENSE file for details.