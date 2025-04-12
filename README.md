# Eventivus

## Project Description

Eventivus is a web application designed to simplify and accelerate the corporate event planning process. This tool allows employees to propose, vote on, and finalize potential event dates, streamlining communication and reducing the need for manual coordination. The application offers two modes: a "Registration" mode for single, confirmed dates and a "Planning" mode for scheduling with multiple proposed dates, along with AI-powered suggestions.

## Tech Stack

- **Frontend:**
  - Astro 5
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
  - Shadcn/ui

- **Backend:**
  - Java 21
  - Spring Boot 3.4.4
  - Spring Data JDBC
  - Lombok
  - PostgreSQL
  - Flyway for database migrations

- **Additional Tools:**
  - JUnit 5 and Mockito for testing
  - Maven for build management
  - Docker & GitHub Actions for CI/CD and deployment

## Getting Started Locally

### Prerequisites
- JDK 21 installed
- Maven installed
- Node.js (version as specified in `.nvmrc`, i.e., **v22.14.0**)

### Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:igorpaprzycki/eventivus.git
   cd eventivus
   ```

2. **Running Backend Service:**
   ```bash
   cd service
   mvn spring-boot:run
   ```
   The backend service will start on port (default is 8080).

3. **Running Frontend:**
   ```bash
   cd ui
   npm install
   npm run ui-dev
   ```
   The UI development server will start and you can access it via your browser at `http://localhost:3000` (or the configured port).

## Available Scripts

### Frontend (Located in `/ui`)
- `npm run ui-dev` - Starts the development server.
- `npm run ui-build` - Builds the production-ready assets.
- `npm run ui-preview` - Previews the production build.
- `npm run ui-astro` - Astro CLI commands.
- `npm run ui-lint` - Runs ESLint for code quality.
- `npm run ui-lint:fix` - Automatically fixes lint errors.
- `npm run ui-format` - Formats code with Prettier.

### Backend (Located in `/service`)
The backend service is managed via Maven. Common commands include:
- `mvn spring-boot:run` - Runs the Spring Boot application.
- `mvn test` - Runs the test suite.

## Project Scope

Eventivus aims to streamline event management within an organization by enabling:
- **User Registration & Authentication:** Simple user signup and session management.
- **Event Creation:** Ability to create events with details like name, description, location, and mode (Registration or Planning).
- **Event Planning:** Choose between a single confirmed date or multiple proposed dates allowing for voting.
- **AI-Powered Suggestions:** Automatic analysis of votes to suggest the optimal event date(s).
- **Dynamic UI:** Real-time validations and a responsive user interface.
- **Management:** Event creators can edit, finalize, or delete events and manage participant registrations.

The application is designed with scalability and modularity in mind, applying clean architecture principles to separate concerns efficiently.

## Project Status

This project is currently in active development as a Minimum Viable Product (MVP). It includes core functionalities for event planning and registration.

## License

This project is licensed under the MIT License.
