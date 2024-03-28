/**
 * @file Defines the authorization middleware for the application.
 * @module middleware
 * @author Fredrik Svensson 
 * @version 0.1.0
 * @since 0.1.0
 */

import jwt from 'jsonwebtoken'
import { tokenBlacklist } from '../config/tokenBlacklist.js'

export class AuthMiddleware {

  /**
   * Middleware to check if the request is authorized.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {void}
   * @throws {Error} Throws an error if the token is blacklisted.
   */
  authMiddleware(req, res, next) {
    // Extract the token from the Authorization header ("Bearer <token>"").
    const token = req.headers.authorization.split(' ')[1]
    if (tokenBlacklist.isListed(token)) {
      return res.status(401).json({ message: 'Token is blacklisted' })
    }

    try {
      // Verify the token
      // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET.replace(/\\n/g, '\n'), { algorithms: ['RS256'] })

      // If the token is valid, call the next middleware function
      next()
    } catch (error) {
      // If the token is not valid, send a 401 Unauthorized response
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
