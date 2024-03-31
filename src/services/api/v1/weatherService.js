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
    console.log(id)
    const weather = await Weather.find({ station: id })
    .sort({ date: -1 })
    .limit(1)
    console.log(weather)
  return weather[0]
  }
}
