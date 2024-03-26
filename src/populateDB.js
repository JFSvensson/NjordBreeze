import dotenv from 'dotenv'
dotenv.config()

import { connectToDatabase, disconnectFromDatabase } from './config/mongoose.js'
import { faker } from '@faker-js/faker'
import { User } from './models/user.js'
import { Station } from './models/station.js'

/**
 * Populates the database with random data.
 *
 * @returns {Promise<void>} A promise that resolves when the database has been populated.
 */
async function populateDB() {
  try {
    await connectToDatabase(process.env.DB_CONNECTION_STRING)

    for (let i = 0; i < 50; i++) {
      let username
      let user

      // Keep generating a username until we get one that's not in use
      do {
        username = faker.lorem.word()
        user = await User.findOne({ username })
      } while (user)

      // Create a new user with random data
      user = new User({
        username,
        passphrase: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
      })

    await user.save()

    // Create 1-5 stations for the user
    const stationCount = Math.floor(Math.random() * 5) + 1
    for (let j = 0; j < stationCount; j++) {
      let stationname
      let station

      // Keep generating a station name until we get one that's not in use
      do {
        stationname = faker.lorem.word()
        station = await Station.findOne({ stationname })
      } while (station)

      station = new Station({
        stationname,
        description: faker.lorem.sentence(),
        location: faker.location.city(),
        owner: user.username
      })

      await station.save()
    }
  } 

  console.log('Database populated!')

  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await disconnectFromDatabase()
  }
}

populateDB()
