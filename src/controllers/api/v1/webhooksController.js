/**
 * @file Defines the webhook controller for the application.
 * @module controller
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { WebhookService } from '../../../services/api/v1/webhooksService.js'

/**
 * Handles requests for webhook data.
 */
export class WebhookController {
  constructor() {
    this.webhookService = new WebhookService()
  }

  /**
   * Register a webhook for a specific station.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {Error} Throws an error if the webhook is not created.
   * @throws {Error} Throws an error if an error occurs while creating the webhook.
   */
  async registerWebhook(req, res) {
    try {
      const { url, stationid } = req.body
      const webhook = await this.webhookService.registerWebhook({ url, stationid })
      if (!webhook) {
        return res.status(400).json({ message: 'Webhook not created' })
      }
      res.status(201).json(webhook)
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the webhook' })
    }
  }
}
