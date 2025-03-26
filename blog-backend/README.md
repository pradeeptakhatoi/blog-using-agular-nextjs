<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project in local

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment

### Configure Environment Variables
Create a .env file in the root directory and update it with your PostgreSQL and OAuth credentials:

```bash
# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=my_super_secret_jwt_key

# Google OAuth (Replace with real credentials from Google Cloud Console)
GOOGLE_CLIENT_ID=1234567890-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Facebook OAuth (Replace with real credentials from Facebook Developer Console)
FACEBOOK_CLIENT_ID=1234567890
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=mynestjsblogdb
```



## How to Build and Run the Docker Container
1️⃣ Build the Docker Image
```bash
docker build -t blog-backend .
```

2️⃣ Run the Container
```bash
docker run -p 3000:3000 --env-file .env blog-backend
```

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
