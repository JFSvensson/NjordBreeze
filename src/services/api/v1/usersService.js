/**
 * @file Defines the users service for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { User } from '../../../models/user.js'

export class UsersService {
  async getUserById(id) {
    const user = await User.findById(id)
    return user
  }
}
