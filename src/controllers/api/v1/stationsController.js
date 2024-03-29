/**
 * @file Defines the local weather station data controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { StationsService } from '../../../services/api/v1/stationsService.js'

/**
 * Handles requests for weather station data.
 */
export class StationsController {
  constructor() {
    this.stationsService = new StationsService()
  }

  /**
   * Get all weather station.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {Error} Throws an error if no weather station is not found.
   * @throws {Error} Throws an error if an error occurs while fetching the weather stations.
   */
  async getStations(req, res) {
    try {
      const station = await this.stationsService.getStations()
      if (!station) {
        return res.status(404).json({ message: 'No station found' })
      }
      res.json(station)
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the weather stations' })
    }
  }

  /**
   * Register a new weather station.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {Error} Throws an error if the weather station is not created.
   * @throws {Error} Throws an error if an error occurs while creating the weather station.
   */
  async registerStation(req, res) {
    try {
      const station = await this.stationsService.registerStation(req.body)
      if (!station) {
        return res.status(400).json({ message: 'Station not created' })
      }
      res.status(201).json(station)
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the weather station' })
    }
  }

  /**
   * Get a specific weather station.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {Error} Throws an error if the weather station is not found.
   * @throws {Error} Throws an error if an error occurs while fetching the weather station.
   */
  async getStation(req, res) {
    try {
      const station = await this.stationsService.getStation(req.params.id)
      if (!station) {
        return res.status(404).json({ message: 'Station not found' })
      }
      res.json(station)
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the weather station' })
    }
  }
}
