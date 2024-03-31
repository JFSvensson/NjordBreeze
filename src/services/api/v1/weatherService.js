/**
 * @file Defines the weather service for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { Weather } from '../../../models/weather.js'

export class WeatherService {
  async getCurrentWeather(id) {
    const weather = await Weather.find({ stationid: id })
    .sort({ createdAt: -1 })
    .limit(1)
  return weather[0]
  }
}
