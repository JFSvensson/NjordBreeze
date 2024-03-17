/**
 * @file Defines the main router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import express from 'express'

export const router = express.Router()

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get API status
 *     description: Returns the status of the API.
 *     tags:
 *      - Status
 *     responses:
 *       200:
 *         description: API is up and running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the NjordBreeze API. Use our endpoints to interact with weather data.
 *                 documentation:
 *                   type: string
 *                   example: https://cscloud8-57.lnu.se/njordbreeze/docs
 */
router.get('/', (req, res) => {
  res.send('Welcome to the NjordBreeze API. Use our endpoints to interact with weather data.')
})
