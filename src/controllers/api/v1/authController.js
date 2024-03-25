/**
 * @file Defines the authorization controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import jwt from 'jsonwebtoken'
import fs from 'fs'
import createError from 'http-errors'
import { AuthService } from '../../../services/api/v1/authService.js'
/**
 * Handles requests regarding authorization.
 */
export class AuthController {
  constructor() {
    this.authService = new AuthService()
  }

  /**
   * Register and create a new user.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async register(req, res, next) {
    try {
      const user = await this.authService.createUser(req.body)

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error
      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.message = 'The username and/or email address is already registered.'
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.message = 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).'
        err.cause = error
      }

      next(err)
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await this.authService.authenticateUser(req.body.username, req.body.passphrase)
      const payload = {
        sub: user._id,
        given_name: user.firstName,
        family_name: user.lastName,
        email: user.email
      }

      // WARNING! PRODUCTION CODE SHOULD NOT CONTAIN THIS LINE! TODO: REMOVE THIS LINE!
      process.env.ACCESS_TOKEN_SECRET = fs.readFileSync('./private.pem', 'utf8')
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      // Authentication failed.
      console.error(error)
      const err = createError(401)
      err.message = 'Credentials invalid or not provided.'
      err.cause = error

      next(err)
    }
  }
}
