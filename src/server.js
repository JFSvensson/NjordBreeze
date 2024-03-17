/**
 * This is the entry point of the application.
 * Inspired by earlier assignments.
 *
 * @file server.js is the root file that starts the server.
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

// Import modules.
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import openapiSpecification from './openapiDef.js'
import { router } from './routes/router.js'

// Create an Express application.
const app = express()

// Set base URL for all relative URL:s in document.
const baseURL = process.env.BASE_URL || '/'

// Setup helmet to secure the application.
app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'gitlab.lnu.se'],
      styleSrc: ["'self'", "'unsafe-inline'", 'gitlab.lnu.se'],
      imgSrc: ["'self'", 'data:', 'gitlab.lnu.se'],
      connectSrc: ["'self'", 'gitlab.lnu.se'],
      frameSrc: ["'self'", 'gitlab.lnu.se'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  })
)

// Serve Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// Use the cookie-parser middleware
app.use(cookieParser())

// // Middleware to be executed before the routes.
// app.use((req, res, next) => {
//   // Add a request UUID to each request and store information about
//   // each request in the request-scoped context.
//   // req.requestUuid = randomUUID()
//   httpContext.set('request', req)

//   next()
// })

// Session middleware.
const sessionMiddleware = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    sameSite: 'strict'
  }
}

// Production settings.
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // Running behind reverse proxy, trust first proxy
  sessionMiddleware.cookie.secure = true // Only serve secure cookies, https
}

app.use(session(sessionMiddleware))

// Middleware for passing the base URL to the views.
app.use((req, res, next) => {
  res.locals.baseURL = baseURL
  next()
})

// Register routes.
app.use('/', router)

// Error handler.
app.use(function (err, req, res, next) {
  // 404 Not Found.
  if (err.status === 404) {
    return res
      .status(404)
      // .sendFile(join(directoryName, 'views', 'errors', '404.html'))
      .end()
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res
      .status(500)
      // .sendFile(join(directoryName, 'views', 'errors', '500.html'))
      .end()
  }

  // Development only!
  // Only providing detailed error in development.

  // Render the error page.
  res
    .status(err.status || 500)
    // .render('errors/error', { error: err })
})

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})

// Export the app and server for testing.
// TODO remove in production.
export default { app, server }
