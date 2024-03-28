/**
 * @file Defines the local weather station data service for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { Station } from '../../../models/station.js'

export class StationsService {
  async getStation(id) {
    console.log('getStation', id)
    const station = await Station.findById(id)
    return station
  }
}
