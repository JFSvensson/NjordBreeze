/**
 * @file Defines the local weather station data router for the application.
 * @module router
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import express from 'express'
import { StationsController } from '../../../controllers/api/v1/stationsController.js'
import { AuthMiddleware } from '../../../middleware/authMiddleware.js'
import { CheckOwnerMiddleware } from '../../../middleware/checkOwnerMiddleware.js'

export const router = express.Router()

const controller = new StationsController()
const checkAuthorization = new AuthMiddleware(controller)
const checkOwner = new CheckOwnerMiddleware()

/**
 * @openapi
 * /stations:
 *  get:
 *    summary: Get all weather stations
 *    description: Returns all weather stations in the system.
 *    tags:
 *      - Weather Stations
 *    responses:
 *      '200':
 *        description: A list of weather stations.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/WeatherStation'
 */
router.get(
  '/',
  (req, res) => controller.getStations(req, res)
)

/**
 * @openapi
 * /stations:
 *  post:
 *    summary: Register a new weather station
 *    description: Registers a new weather station in the system.
 *    tags:
 *      - Weather Stations
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/WeatherStationRegistration'
 *    responses:
 *      '201':
 *        description: Weather station registered successfully.
 *      '401':
 *        description: Unauthorized.
 */
router.post(
  '/', 
  (req, res) => { res.send('Weather station registered!') // TODO: Implement weather station registration
})

/**
 * @openapi
 * /stations/{id}:
 *  get:
 *    summary: Get information about a specific weather station
 *    description: Returns information about a specific weather station in the system.
 *    tags:
 *      - Weather Stations
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The weather station's ID.
 *    responses:
 *      '200':
 *        description: Successful response with weather station information.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WeatherStation'
 *      '404':
 *        description: Weather station not found.
 */
router.get(
  '/:id',
  (req, res) => controller.getStation(req, res)
)

/**
 * @openapi
 * /stations/{id}:
 *  put:
 *    summary: Update information about a specific weather station
 *    description: Updates information about a specific weather station in the system.
 *    tags:
 *      - Weather Stations
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The weather station's ID.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/WeatherStation'
 *    responses:
 *      '200':
 *        description: Weather station updated successfully.
 *      '401':
 *        description: Unauthorized.
 */
router.put('/:id', (req, res) => {
  res.send('Weather station updated!') // TODO: Implement weather station update
})

/**
 * @openapi
 * /stations/{id}:
 *  delete:
 *    summary: Delete a specific weather station
 *    description: Deletes a specific weather station from the system.
 *    tags:
 *      - Weather Stations
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The weather station's ID.
 *    responses:
 *      '200':
 *        description: Weather station deleted successfully.
 *      '401':
 *        description: Unauthorized.
 */
router.delete('/:id', (req, res) => {
  res.send('Weather station deleted!') // TODO: Implement weather station deletion
})

/**
 * @openapi
 * components:
 *  schemas:
 *    WeatherStation:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The unique identifier for the weather station.
 *        name:
 *          type: string
 *          description: The name of the weather station.
 *        location:
 *          type: string
 *          description: The location of the weather station.
 *
 *    WeatherStationRegistration:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the weather station.
 *        location:
 *          type: string
 *          description: The location of the weather station.
 */
