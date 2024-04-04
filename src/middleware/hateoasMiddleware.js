/**
 * @file Defines the HATEOAS links middleware for the application.
 * @module middleware
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

export class HateoasMiddleware {

  /**
   * Middleware to add HATEOAS links to the response object.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @returns {void}
   */
  static addLinks(req, res, next) {
    const links = {
      _links: {
        self: req.originalUrl,
        auth: '/auth',
        weather: '/weather',
        stations: '/stations',
        users: '/users',
        webhooks: '/webhooks',
      }
    }
    res.locals.hateoas = links
    next()
  }

}
