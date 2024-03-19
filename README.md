# Nest.js Project: CULQI TOKENIZER

This is a [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

API component for technical test for CULQI company.


## ✨ About this Project

This API exposes 2 endpoints (that can be visualize on swagger) to obtain a token by sending a card complete information body saving it on Redis, and the other one obtains partial information of the card by sending the generated token.

## Architecture & Configuration Details

This project is structured around best practices in software architecture and design, aimed at ensuring scalability, maintainability, and ease of deployment. Here are the key practices adopted:

### Clean Architecture

Adhering to the principles of Clean Architecture, the codebase is organized into layers with clear responsibilities.
This separation of concerns facilitates independent development and testing of each layer, promoting a more robust and testable codebase.

### Vertical Slices

Adopting partially this architecture, principal components of a use case can be accessed on a same context without needed to acceed different classes or folder to avoid losing the principal concern.

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

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

Open [http://localhost:8080/api](http://localhost:8080/api) to test directly using Swagger.

## Tests

Jest's unit tests based can be run by executing the following command:

```bash
npm test
```

## 🏗️ CI/CD

Pipeline is configured on the root path of the repository. It is executed when making a push to the "main" branch.
The main pipeline executes the unit test and then starts the deployment to AWS EKS by creating and pushing an image to AWS ECR first.

## 🛠️ Built With

- Nest.js 10
- TypeScript
- Swagger
- Redis
- Docker

## 🖋️ Authors

Stefano Garcia - Fullstack Dev
