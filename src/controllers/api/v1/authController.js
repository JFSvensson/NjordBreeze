/**
 * @file Defines the authorization controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @since 0.1.0
 */


/**
 * Handles requests regarding authorization.
 */
export class AuthController {
  /**
   * Creates a new user.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   */
  async register(req, res, next) {
    res.send('User created')
  }
}
