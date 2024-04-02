/**
 * @file Defines the weather controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { WeatherService } from '../../../services/api/v1/weatherService.js'

/**
 * Handles requests for weather data.
 */
export class WeatherController {
  constructor() {
    this.weatherService = new WeatherService()
  }

  /**
     * Add weather data for a specific location.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {void}
     * @throws {Error} Throws an error if the weather data is not added.
     * @throws {Error} Throws an error if an error occurs while adding the weather data.
     */
  async addWeatherData(req, res) {
    try {
      const data = {
        ...req.body,
        stationid: req.params.id
      }
      const weather = await this.weatherService.addWeatherData(data)
      if (!weather) {
        return res.status(400).json({ message: 'Weather data not added' })
      }
      res.status(201).json(weather)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An error occurred while adding the weather data' })
    }
  }

  /**
   * Get current weather data for a specific location.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {Error} Throws an error if no weather data is found.
   * @throws {Error} Throws an error if an error occurs while fetching the weather data.
   */
  async getCurrentWeatherData(req, res) {
    try {
      const weather = await this.weatherService.getCurrentWeatherData(req.params.id)
      if (!weather) {
        return res.status(404).json({ message: 'No weather data found' })
      }
      res.json(weather)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An error occurred while fetching the weather data' })
    }
  }
}
