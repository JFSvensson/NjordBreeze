/**
 * @file This module contains the configuration for the Mongoose ODM.
 * @module config/mongoose-config
 * @author Mats Loock
 * @version 3.0.0
 */

import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @param {string} connectionString - The connection string.
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectToDatabase = async (connectionString) => {
  const { connection } = mongoose

  // Will cause errors to be produced instead of dropping the bad data.
  mongoose.set('strict', 'throw')

  // Turn on strict mode for query filters.
  mongoose.set('strictQuery', true)

  // Bind connection to events (to get notifications).
  connection.on('connected', () => console.log('MongoDB connection opened.'))
  connection.on('error', (err) => console.error(`MongoDB connection error occurred: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB is disconnected.'))

  // If the Node.js process ends, close the connection.
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('MongoDB disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect(connectionString)
}
