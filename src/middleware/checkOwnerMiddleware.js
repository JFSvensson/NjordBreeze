/**
 * @file Defines the check owner middleware for the application.
 * @module middleware
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { Station } from '../models/station.js'
import { Weather } from '../models/weather.js'
import { validateId } from '../utils/validation.js'

export class CheckOwnerMiddleware {

  /**
   * Middleware to check if the request is authorized.
   * If the user is not the owner of the requested resource, a 403 Forbidden response is sent.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {void}
   */
  async checkOwner(req, res, next) {
    try {
      const id = req.params.id

      await validateId(id)
      const isOwner = this.isOwner(req.user.sub, id)
      if (!isOwner) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own data' })
      }
      next()  
    } catch (error) {
      if (error.message === 'Invalid id') {
        return res.status(400).json({ message: 'Invalid id format' })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  /**
   * Middleware to check if the request is authorized to modify a station.
   * If the user is not the owner of the requested station, a 403 Forbidden response is sent.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {void}
   */
  async checkOwnerStation(req, res, next) {
    try {
      const id = req.params.id
      await validateId(id)
  
      const station = await Station.findById(id)
      if (!station) {
        return res.status(404).json({ message: 'Station not found' })
      }
  
      const isOwner = this.isOwner(req.user.sub, station.owner)
      if (!isOwner) {
        return res.status(403).json({ message: 'Forbidden: You can only modify your own station' })
      }
      next()  
    } catch (error) {
      if (error.message === 'Invalid id') {
        return res.status(400).json({ message: 'Invalid id format' })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  /**
   * Middleware to check if the request is authorized to modify a station.
   * If the user is not the owner of the requested weather data, a 403 Forbidden response is sent.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {void}
   */
  async checkOwnerWeatherData(req, res, next) {
    try {
      const id = req.params.id
      await validateId(id)
    
      const weatherData = await Weather.findById(id)
      if (!weatherData) {
        return res.status(404).json({ message: 'Weather data not found' })
      }
      const station = await Station.findById(weatherData.stationid)
      const isOwner = this.isOwner(req.user.sub, station.owner)
      if (!isOwner) {
        return res.status(403).json({ message: 'Forbidden: You can only modify data for your own station' })
      }
      next()  
    } catch (error) {
      if (error.message === 'Invalid id') {
        return res.status(400).json({ message: 'Invalid id format' })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  isOwner(userIdFromToken, userIdFromResource) {
    return userIdFromToken.toString() === userIdFromResource.toString()
  }
}
