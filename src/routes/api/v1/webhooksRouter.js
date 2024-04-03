/**
 * @file Defines the webhook router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 * @version 0.1.0
 */

import express from 'express'
import { WebhookController } from '../../../controllers/api/v1/webhooksController.js'

export const router = express.Router()

const controller = new WebhookController()

/**
 * @openapi
 * /webhooks/register:
 *  post:
 *    summary: Register a webhook
 *    description: Adds a new webhook that check for changes in temperature, windspeed or winddirection at a specific weather station in the system.
 *    tags:
 *      - Webhook
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Webhook'
 *    responses:
 *      '201':
 *        description: Webhook registered successfully.
 *      '404':
 *        description: Weather station not found.
 */
router.post(
  '/register',
  (req, res) => controller.registerWebhook(req, res)
)

/**
 * @openapi
 * /webhooks/remove/{id}:
 *  delete:
 *    summary: Remove a webhook
 *    description: Removes a webhook.
 *    tags:
 *      - Webhook
 *    parameters:
 *      - name: webhookId
 *        in: path
 *        required: true  
 *        schema:
 *          type: string
 *        description: The webhook's ID.
 *    responses:
 *      '201':
 *        description: Webhook removed successfully.
 *      '404':
 *        description: Webhook not found.
 */
router.delete(
  '/remove/:id',
  (req, res) => controller.removeWebhook(req, res)
)

/**
 * @openapi
 * components:
 *  schemas:
 *   Webhook:
 *    type: object
 *    properties:
 *     url:
 *      type: string
 *      description: URL to notify.
 *     stationid:
 *      type: string
 *      description: Id for the weather station to be monitored for changes.
 */
