# Nest.js Project: GET COMMS

This is a [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

API component for technical test for CULQI company.

## ✨ About this Project

This project is structured around best practices in software architecture and design, aimed at ensuring scalability, maintainability, and ease of deployment. Here are the key practices adopted:

### Clean Architecture

Adhering to the principles of Clean Architecture, the codebase is organized into layers with clear responsibilities:

- `entities` contain business logic and models.
- `use-cases` host the application-specific business rules.
- `interfaces` handlers different implementations using dependency injection.
- `controllers` manage the incoming requests and delegate to appropriate services.

This separation of concerns facilitates independent development and testing of each layer, promoting a more robust and testable codebase.

### Modular Design

Modules (`core`, `common`) are used extensively to encapsulate functionality. This modularization supports the SOLID principles, particularly Single Responsibility and Open/Closed, by allowing for features to be added or updated with minimal impact on existing code.

### Code Quality and Standards

- Strict TypeScript configuration enforces type safety and reduces runtime errors.
- ESLint and Prettier ensure code style consistency across the codebase.
- Swagger is integrated for API documentation, making it easier to test and interact with the API endpoints. This promotes better understanding and usability of the API for developers.

By adopting these practices, this project maintains a high standard of code quality and sets the foundation for a scalable and resilient application. The use of Nest.js as the underlying framework leverages its powerful features and facilitates the implementation of these best practices.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### 📋 Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v7.10 or higher)

### 🔧 Installation

1. Clone the repository:

```cmd
git clone https://github.com/stephgl07/culqi-backend-2024.git
```

2. Navigate to the project directory:

```bash
cd [directory-path]
```

3. Install the dependencies:

```bash
npm install
```

4. Run the server:

Running on a docker container

```bash
docker-compose up
```

Running locally

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/api](http://localhost:3000/api) to test directly using Swagger.

## Tests

Jest's unit tests based can be run by executing the following command:

```bash
npm test
```

## 🏗️ CI/CD

Pipeline is configured on the root path of the repository. It is executed when making a push to the "main" branch.

You can test the deployment result here! => [https://project-getcomms-api.azurewebsites.net/api](https://project-getcomms-api.azurewebsites.net/api)

## 🛠️ Built With

- Nest.js 10
- TypeScript
- Swagger
- Redis
- Docker

## 🖋️ Authors

Stefano Garcia - Fullstack Dev
