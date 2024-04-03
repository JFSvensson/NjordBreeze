/**
 * @file Defines the router for the API.
 * @module router
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import express from 'express'
import { router as authRouter } from './authRouter.js'
import { router as weatherRouter } from './weatherRouter.js'
import { router as stationsRouter } from './stationsRouter.js'
import { router as usersRouter } from './usersRouter.js'
import { router as webhooksRouter } from './webhooksRouter.js'

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
  res.json({
    message: 'Welcome to the NjordBreeze API. Use our endpoints to interact with weather data.',
    documentation: 'https://cscloud8-57.lnu.se/njordbreeze/docs'
    // TODO: Implement HATEOAS links
  })
})

router.use('/auth', authRouter)
router.use('/weather', weatherRouter)
router.use('/stations', stationsRouter)
router.use('/users', usersRouter)
router.use('/webhooks', webhooksRouter)
