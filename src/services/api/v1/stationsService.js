/**
 * @file Defines the local weather station data service for the application.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import { Station } from '../../../models/station.js'
import { SMHIStation } from '../../../models/smhiStation.js'
import { validateId, validateStationData } from './validation.js'

export class StationsService {

  async getStations() {
    const stations = await Station.find()
    return stations
  }

  async registerStation(data) {
    validateStationData(data)
    const station = await Station.create(data)
    return station
  }

  async getStation(id) {
    await validateId(id)
    const station = await Station.findById(id)
    return station
  }

  async getNearestStation(id) {
    await validateId(id)
    const station = await this.getStation(id)
    try {
      const nearestStation = await Station.findOne({
        _id: { $ne: id },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: station.location.coordinates
            },
            $maxDistance: 1000000
          }
        }
      })
      const nearestSMHIStation = await SMHIStation.findOne({ 
        _id: { $ne: id },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: station.location.coordinates
            },
            $maxDistance: 1000000
          }
        }
      })
      return { nearestStation, nearestSMHIStation }
    } catch (error) {
      console.log(error)
    }
  }

  async updateStation(id, data) {
    await validateId(id)
    const station = await Station.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    return station
  }

  async deleteStation(id) {
    await validateId(id)
    const station = await Station.findByIdAndDelete(id)
    return station
  }
}
