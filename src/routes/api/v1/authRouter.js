/**
 * @file Defines the authorization router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import express from 'express'

export const router = express.Router()

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: Log in to the API
 *    description: Logs in to the API and returns an access token.
 *    tags:
 *      - Authorization
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: The username of the user.
 *              passphrase:
 *                type: string
 *                description: The passphrase of the user.
 *    responses:
 *      '200':
 *        description: User logged in successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: The access token for the user.
 *      '401':
 *        description: Unauthorized.
 */
router.post('/login', (req, res) => {
  res.send('Logged in!') // TODO: Implement login
})

/**
 * @openapi
 * /auth/logout:
 *  post:
 *    summary: Log out of the API
 *    description: Logs out of the API and invalidates the access token.
 *    tags:
 *      - Authorization
 *    responses:
 *      '200':
 *        description: User logged out successfully.
 *      '401':
 *        description: Unauthorized.
 */
router.post('/logout', (req, res) => {
  res.send('Logged out!') // TODO: Implement logout
})

/**
 * @openapi
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     description: Refreshes the access token for the user.
 *     tags:
 *       - Authorization
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully.
 *       '401':
 *         description: Unauthorized.
 */
router.get('/auth/refresh', (req, res) => {
  res.send('Access token refreshed!') // TODO: Implement refresh
})
