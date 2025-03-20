# blog-using-agular-nextjs
A blog using ANgular &amp; NetxJS. Support Google &amp; FB Login

# NestJS Blog Backend

This is a **NestJS-based backend** for a blog application with authentication (JWT, Google, Facebook), user management, and posts management using PostgreSQL and TypeORM.

## Features
- User Authentication (JWT, Google OAuth, Facebook OAuth)
- User Management (CRUD)
- Post Management (CRUD)
- PostgreSQL Database Integration with TypeORM

---

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)
- [Docker](https://www.docker.com/) (Optional, for running PostgreSQL in a container)

---

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repository/nestjs-blog-backend.git
   cd nestjs-blog-backend

Running the Application
Development Mode
sh
Copy
Edit
npm run start:dev
The server will start on http://localhost:3000

Production Mode
sh
Copy
Edit
npm run build
npm run start

API Endpoints
Authentication Routes
Method	Endpoint	Description
POST	/auth/login	Login with email & password
POST	/auth/signup	Register a new user
GET	/auth/google	Google OAuth login
GET	/auth/facebook	Facebook OAuth login
Users Routes
Method	Endpoint	Description
GET	/users	Get all users
GET	/users/:id	Get a user by ID
POST	/users	Create a user
PUT	/users/:id	Update a user
DELETE	/users/:id	Delete a user
Posts Routes
Method	Endpoint	Description
GET	/posts	Get all posts
GET	/posts/:id	Get a post by ID
POST	/posts	Create a new post
PUT	/posts/:id	Update a post
DELETE	/posts/:id	Delete a post
Testing
Run unit tests:

sh
Copy
Edit
npm run test
Run end-to-end (E2E) tests:

sh
Copy
Edit
npm run test:e2e
Check code formatting:

sh
Copy
Edit
npm run lint
Deployment
To deploy the backend in production, consider using Docker or a cloud provider like AWS, DigitalOcean, or Heroku.

Deploy with Docker
Build the Docker image:
sh
Copy
Edit
docker build -t nestjs-blog-backend .
Run the container:
sh
Copy
Edit
docker run -p 3000:3000 --env-file .env nestjs-blog-backend