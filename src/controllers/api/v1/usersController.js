/**
 * @file Defines the users controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { UsersService } from '../../../services/api/v1/usersService.js'

/**
 * Handles requests for user data.
 */
export class UsersController {
  constructor() {
    this.usersService = new UsersService()
  }

  /**
   * Get a specific user.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async getUser(req, res) {
    try {
      const user = await this.usersService.getUserById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the user' })
    }
  }
}
