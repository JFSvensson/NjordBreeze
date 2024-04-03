/**
 * @file This file defines the Webhook model.
 * @module models
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  stationid: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Webhook = mongoose.model('Webhook', schema)
