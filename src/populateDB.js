import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { User } from './models/user.js'
import { Station } from './models/station.js'

mongoose.connect('mongodb://localhost:27017/mongodb-nb')

/**
 * Populates the database with random data.
 *
 * @returns {Promise<void>} A promise that resolves when the database has been populated.
 */
async function populateDB() {
  for (let i = 0; i < 50; i++) {
    let username
    let user

    // Keep generating a username until we get one that's not in use
    do {
      username = faker.person.middleName()
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
  mongoose.connection.close()
}

populateDB()