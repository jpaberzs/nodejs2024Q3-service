# Home Library

## Project Overview

Home Library is a Node.js and NestJS-powered application built to help manage and organize your personal library. It includes modules for managing users, tracks, artists, albums, and favorites, offering a complete system for interacting with your collection. Additionally, the application integrates Swagger to provide easy-to-use API documentation for developers and users alike.

## Prerequisites

- Node.js and npm
- NestJS CLI (for development)

## Link to Docker Hub repository

```bash
https://hub.docker.com/r/jpaberzs/nodejs2024q3-service
```

## Setup and Installation

1.  **Clone the repository:**
    - `git clone https://github.com/jpaberzs/nodejs2024Q3-service.git`
    - `cd nodejs2024Q3-service`
    - `git checkout dev_docker`
2.  **Install dependencies:**
    - `npm install`
3.  **Set environment variables:** Create a `.env` file in the project root and configure it based on your setup. For example:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=my_database
DATABASE_URL=postgresql://postgres:postgres@db:5432/my_database
```

4.  **Development mode:**

This mode runs in watch mode.

```bash
`npm run docker:up`
```

If you will have trouble with bd, run following commands in terminal (one bt one):

```bash
    docker exec -it node-app bash
    npx prisma migrate dev --name init
```

## Audit

To run audit run script in terminal:

```bash
    npm run docker-audit
```

## API Documentation

Swagger is used for API documentation. To view the API docs, navigate to `http://localhost:<PORT1>/doc` after starting the application.

## Scripts

- `npm run build` - Builds the application.
- `npm run format` - Formats code using Prettier.
- `npm run lint` - Runs ESLint on the source code.
- `npm run start` - Starts the application in production mode.
- `npm run start:dev` - Starts the application in development mode with live reloading.
- `npm run test` - Runs unit tests with Jest.
- Additional test scripts for debugging, coverage, and authentication-related tests are also included.

## Technologies Used

- **NestJS** - A progressive Node.js framework.
- **Swagger** - For generating and viewing API documentation.
- **Jest** - For unit and end-to-end testing.
- **ESLint & Prettier** - For code linting and formatting.

## Project Structure

- `src/modules/` - Contains the feature modules (`user`, `track`, `artist`, `album`, and `favs`).
- `src/app.module.ts` - The root module that imports all feature modules.
- `src/doc/api.yaml` - Swagger documentation file.

## License

This project is UNLICENSED.
