/**
 * @file Defines the check owner middleware for the application.
 * @module middleware
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

export class CheckOwnerMiddleware {

  /**
   * Middleware to check if the request is authorized.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {void}
   * @throws {Error} Throws an error if the user is not the owner of the resource.
   */
  async checkOwner(req, res, next) {
    const userIdFromToken = req.user.sub
    const userIdFromParams = req.params.id
    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({ message: 'Forbidden: You can only access your own data' })
    }
    next()
  }
}
