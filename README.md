# NjordBreeze API

NjordBreeze API is a weather data service that allows users to compare data from their personal weather stations with official data provided by SMHI. The API is designed to be RESTful and follows HATEOAS principles to enhance client navigation through the service.

## Features

- **User Authentication:** Secure login and registration with JWT for managing sessions.
- **Weather Data Comparison:** Fetch and compare weather data from SMHI and personal stations.
- **Personal Weather Stations Management:** Users can add, update, and remove their weather stations.
- **Data Integrity and Security:** Implemented with HTTPS and JWT to ensure data security and integrity.
- **Automated Testing:** Includes a Postman collection for API testing and integration with Newman for automated test runs.

## Technology Stack

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user and weather station data.
- **Mongoose:** MongoDB object modeling tool.
- **Docker:** Containerization of the database and possibly the entire application for easy deployment.
- **PM2:** Advanced, production process manager for Node.js applications.
- **Swagger:** API documentation generation tool integrated to provide live API documentation under `/docs`.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/JFSvensson/NjordBreeze.git
   cd njordbreeze
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Environment Variables**

   Add proper environment variables. These variables include database connection strings, port number, and secrets for JWT.

4. **Run the Application**

   For production:
   PM2 or similar is recommended. Also a database, preferably MongoDB in a docker container.


   For development:

   ```bash
   npm run dev
   ```

## API Usage

Refer to the Swagger documentation at `https://svenssonom.se/njordbreeze/docs/` for detailed usage of the API endpoints. This includes authentication flows, managing weather stations, and accessing weather data.

## Testing

Run the provided Postman collection using Newman to execute integration tests.

```bash
newman run NjordBreeze API.postman_collection.json
```

### Bugs and errors

The Postman collections tends to fail at deleting user, weather data and/or weather station. It is currently unknown why, but it doesn't happen all the time so do run with the  "--iteration-count 10".

## Contributing

Contributions to the NjordBreeze API are welcome. Please ensure that your pull requests provide a detailed description of changes and pass all the tests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
