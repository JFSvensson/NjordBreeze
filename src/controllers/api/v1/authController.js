/**
 * @file Defines the authorization controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import createError from 'http-errors'
import { User } from '../../../models/user.js'

/**
 * Handles requests regarding authorization.
 */
export class AuthController {
  /**
   * Register and create a new user.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async register(req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        passphrase: req.body.passphrase,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      await user.save()

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
}
