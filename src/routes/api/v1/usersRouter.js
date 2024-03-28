/**
 * @file Defines the users router for the application.
 * @module router
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import express from 'express'
import { UsersController } from '../../../controllers/api/v1/usersController.js'
import { AuthMiddleware } from '../../../middleware/authMiddleware.js'

export const router = express.Router()

const controller = new UsersController()
const middleware = new AuthMiddleware(controller)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get information about a specific user
 *     description: Returns information about a specific user in the system.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID.
 *     responses:
 *       '200':
 *         description: Successful response with user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 */
router.get('/:id', middleware.authMiddleware.bind(middleware), (req, res) => controller.getUser(req, res))

 /**
 * @openapi
 * /users/{id}:
 *   put:
 *    summary: Update information about a specific user
 *    description: Updates information about a specific user in the system.
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The user's ID.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewUser'
 *    responses:
 *      '200':
 *        description: User updated successfully.
 *      '404':
 *        description: User not found.
 */
router.put('/:id', middleware.authMiddleware.bind(middleware), (req, res) => controller.updateUser(req, res))

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a specific user
 *     description: Deletes a specific user from the system.
 *     tags:
 *      - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID.
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 */
router.delete('/:id', (req, res) => {
  res.send('User deleted!') // TODO: Implement user deletion
})

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's ID.
 *         name:
 *           type: string
 *           description: The user's full name.
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 */
