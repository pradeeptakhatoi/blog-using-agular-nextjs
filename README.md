# Blog Application using Angular & Next.js (Frontend) and NestJS (Backend)

A modern **blog application** built using **Angular** and **Next.js** for the frontend and **NestJS** for the backend.  
It supports authentication via **Google OAuth and Facebook OAuth** and includes robust user and post management features.

---

## 🛠 Features

### 🔹 Backend (NestJS)
- **Authentication & Authorization** (JWT, Google OAuth, Facebook OAuth)
- **User Management** (Create, Read, Update, Delete)
- **Post Management** (Create, Read, Update, Delete)
- **Database Integration** with PostgreSQL & TypeORM

### 🔹 Frontend
- **Angular** and **Next.js** for a seamless UI/UX
- **Google & Facebook Login**
- **Responsive Design**

---

## 📌 Prerequisites

Ensure you have the following installed:
- **[Node.js](https://nodejs.org/)** (v16 or later)
- **[PostgreSQL](https://www.postgresql.org/)** (v12 or later)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repository/nestjs-blog-backend.git
cd nestjs-blog-backend

2️⃣ Install Dependencies

npm install


3️⃣ Configure Environment Variables
Create a .env file in the root directory and update it with your PostgreSQL and OAuth credentials:

DATABASE_URL=postgres://user:password@localhost:5432/blogdb
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

Running the Application

npm run start:dev

Production Mode

npm run build
npm run start


## 📌 API Endpoints

### 🔹 Authentication Routes
| Method | Endpoint         | Description                     |
|--------|-----------------|---------------------------------|
| `POST` | `/auth/login`   | Login with email & password    |
| `POST` | `/auth/signup`  | Register a new user            |
| `GET`  | `/auth/google`  | Google OAuth login             |
| `GET`  | `/auth/facebook`| Facebook OAuth login           |

### 🔹 User Routes
| Method   | Endpoint       | Description         |
|----------|---------------|---------------------|
| `GET`    | `/users`      | Get all users      |
| `GET`    | `/users/:id`  | Get a user by ID   |
| `POST`   | `/users`      | Create a new user  |
| `PUT`    | `/users/:id`  | Update a user      |
| `DELETE` | `/users/:id`  | Delete a user      |

### 🔹 Post Routes
| Method   | Endpoint       | Description        |
|----------|---------------|--------------------|
| `GET`    | `/posts`      | Get all posts     |
| `GET`    | `/posts/:id`  | Get a post by ID  |
| `POST`   | `/posts`      | Create a new post |
| `PUT`    | `/posts/:id`  | Update a post     |
| `DELETE` | `/posts/:id`  | Delete a post     |

---
