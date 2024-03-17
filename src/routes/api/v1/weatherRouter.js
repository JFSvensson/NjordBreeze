/**
 * @file Defines the weather data router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import express from 'express'

export const router = express.Router()

/**
 * @openapi
 * /weather/current:
 *   get:
 *     summary: Get current weather conditions
 *     description: Returns current weather conditions from SMHI open data for a specified location.
 *     tags:
 *       - Weather Data
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: The location to fetch current weather conditions for.
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
router.get('/current', (req, res) => {
  res.send('Current weather data!') // TODO: Implement current weather data
})

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
 */
