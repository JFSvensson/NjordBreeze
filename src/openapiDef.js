/**
 * OpenAPI definition for the NjordBreeze API.
 */
import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NjordBreeze API',
      version: '0.1.0',
      description: 'API for integrating personal weather station data with SMHI open data for comparison and analysis.',
      contact: {
        name: 'Fredrik Svensson',
        email: 'fs222id@student.lnu.se'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://cscloud8-57.lnu.se/njordbreeze/',
        description: 'Production server'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/routes/api/v1/**/*.js']
}

const openapiSpecification = swaggerJSDoc(options)

export default openapiSpecification
