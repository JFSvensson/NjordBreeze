/**
 * @file Defines the weather data router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import express from 'express'
import { WeatherController } from '../../../controllers/api/v1/weatherController.js'
import { AuthMiddleware } from '../../../middleware/authMiddleware.js'
import { CheckOwnerMiddleware } from '../../../middleware/checkOwnerMiddleware.js'

export const router = express.Router()

const controller = new WeatherController()
const checkAuthorization = new AuthMiddleware(controller)
const checkOwner = new CheckOwnerMiddleware()


/**
 * @openapi
 * /weather/{id}:
 *  get:
 *    summary: Get all weather data.
 *    description: Returns all weather data from a specific station.
 *    tags:
 *      - Weather Data
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true  
 *        schema:
 *          type: string
 *        description: The weather station's ID.
 *    responses:
 *      '200':
 *        description: A list of weather data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WeatherData'
 *      '404':
 *        description: Weather data not found.
 */
router.get(
  '/:id',
  (req, res) => controller.getAllWeatherData(req, res)
)

/**
 * @openapi
 * /weather/current/{id}:
 *   get:
 *     summary: Get current weather conditions.
 *     description: Returns current weather conditions, being the data most recently added, for a specified location.
 *     tags:
 *       - Weather Data
 *     parameters:
 *       - in: query
 *         name: stationid
 *         schema:
 *           type: string
 *         required: true
 *         description: The id for the weather station to fetch current weather conditions for.
 *     responses:
 *       '200':
 *         description: Successful response with current weather conditions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherData'
 *       '404':
 *         description: Location not found.
 */
router.get(
  '/current/:id',
  (req, res) => controller.getCurrentWeatherData(req, res)
)

/**
 * @openapi
 * components:
 *  schemas:
 *   WeatherData:
 *    type: object
 *    properties:
 *     temperature:
 *      type: number
 *      format: float
 *      description: Temperature in Celsius.
 *     windSpeed:
 *      type: number
 *      format: float
 *      description: Wind speed in m/s.
 *     stationname:
 *      type: string
 *      description: The name of the weather station providing the data.
 */
