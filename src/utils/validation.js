/**
 * @file Defines validation functions for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import mongoose from 'mongoose'

export function validateId(id) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid id')
  }
}

export function validateStationData(data) {
  if (!data.stationname || typeof data.stationname !== 'string' || data.stationname.trim().length < 1) {
    throw new Error('Invalid station name')
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 1) {
    throw new Error('Invalid description')
  }

  if (!data.location || data.location.type !== 'Point' || !Array.isArray(data.location.coordinates) || data.location.coordinates.length !== 2) {
    throw new Error('Invalid location')
  }

  if (!data.owner || typeof data.owner !== 'string') {
    throw new Error('Invalid owner')
  }
}
