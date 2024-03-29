/**
 * @file Defines the local weather station data service for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { Station } from '../../../models/station.js'

export class StationsService {
  async getStations() {
    const stations = await Station.find()
    return stations
  }

  async registerStation(data) {
    const station = new Station(data)
    await station.save()
    return station
  }

  async getStation(id) {
    const station = await Station.findById(id)
    return station
  }
}
