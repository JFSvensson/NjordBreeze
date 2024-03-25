/**
 * @file Defines the authorization middleware for the application.
 * @module middleware
 * @author Fredrik Svensson 
 * @version 0.1.0
 * @since 0.1.0
 */
export class AuthMiddleware {
  constructor(controller) {
    this.controller = controller
  }

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
    if (this.controller.tokenBlacklist.check(token)) {
      return res.status(401).json({ message: 'Token is blacklisted' })
    }
    next()
  }
}
