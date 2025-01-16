# Project Setup Guide

This guide will help you set up and run the project locally on your development machine.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**: To manage dependencies
- **TypeScript**: Install globally if not already installed
  ```bash
  npm install -g typescript
  ```
- **Redis**: If testing Redis locally, you need to install and run a Redis instance.

  ### Installing Redis Locally Using Docker
  If you don’t have Redis installed locally, you can use Docker to run a Redis instance:
  ```bash
  docker run --name redis-local -p 6379:6379 -d redis
  ```
  This command pulls the Redis image, runs it in a container, and maps it to port 6379 on your local machine.

  Once Redis is running, use the following URL in your `.env` file for local testing:
  ```
  REDIS_URL=redis://localhost:6379
  ```

## Installation Steps

1. **Clone the Repository**
   
   Use the following command to clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd <project-folder>
   ```

3. **Install Dependencies**
   Install all required dependencies using npm or yarn:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Running the Project Locally

1. **Development Mode**
   
   Start the project in development mode with hot-reloading using `nodemon`:
   ```bash
   npm run dev
   ```

   This will watch your files for changes and restart the server automatically.

2. **Build the Project**
   
   Compile the TypeScript files into JavaScript:
   ```bash
   npm run build
   ```

   The compiled files will be located in the `dist/` directory.

3. **Start the Project**
   
   Start the server using the compiled files:
   ```bash
   npm start
   ```

   This will run the server using `node` and the compiled JavaScript files in the `dist/` directory.

4. **Run the Project Using Docker Compose**
   
   If you have Docker Desktop installed, you can use `docker-compose` to set up and run the entire application, including Redis and the app server:
   ```bash
   docker-compose up
   ```
   This command will start all services defined in the `docker-compose.yml` file, ensuring everything is set up correctly for local testing.

## Project Structure

Here’s an overview of the project structure:

```
project-folder/
├── src/                # Source TypeScript files
│   ├── index.ts        # Main entry point
│   ├── app.ts          # Express app setup
│   └── ...             # Other project files
├── dist/               # Compiled JavaScript files (generated after build)
├── package.json        # Dependency and script definitions
├── tsconfig.json       # TypeScript configuration
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # Project setup guide
```

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the required variables. Example:

```
PORT=3000
REDIS_URL=redis://localhost:6379
```

## Testing the Setup

After completing the setup, you can test if everything is working by running the following commands:

- Start the development server:
  ```bash
  npm run dev
  ```
  Open your browser and navigate to `http://localhost:3000` to access the application.

- Run the built version:
  ```bash
  npm run build
  npm start
  ```
  Open your browser and navigate to `http://localhost:3000` to ensure the production build works as expected.

- Run the app using Docker Compose:
  ```bash
  docker-compose up
  ```
  This will spin up the app and Redis in a single command. Open your browser and navigate to `http://localhost:3000` to access the application.

## Additional Notes

- Ensure that `tsconfig.json` is correctly configured for the project.
- If using Redis or any other external services, ensure they are running and configured properly.
- Contributions and feedback are welcome!

