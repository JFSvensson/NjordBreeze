/**
 * @file Defines the webhook service for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { Webhook } from '../../../models/webhook.js'

export class WebhookService {
  async registerWebhook(url, stationid) {
    const webhook = await Webhook.create(url, stationid)
    return webhook
  }

  async notifyWebhooks(data) {
    const webhooks = await Webhook.find({ stationid: data.stationid })
    webhooks.forEach(webhook => {
      fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    })
  }
}
