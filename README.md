# Activities Frontend

## Description

This is the frontend component of the Activities project, providing a user interface for searching and managing activities.

## Backend Repository

The backend repository for this application can be found at:
[Activities Backend Repository](https://github.com/Hossam-Ali/activities-backend)

## How to Run

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:

```
npm install
```

### Starting the Development Server without Docker

To start the development server, run:

```
npm start
```

The server will start running on `http://localhost:5173`.

### Running with Docker

To run the application using Docker, make sure Docker is installed and follow these steps:

1. Build and start the Docker container:

```
docker-compose up --build
```

This command will build the Docker image for the frontend application and start the container. You can access the application at `http://localhost:5173`.

## How to Run Tests

To run tests, execute the following command:

```
npm test
```
