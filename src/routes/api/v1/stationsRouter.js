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
import { HateoasMiddleware } from '../../../middleware/hateoasMiddleware.js'

export const router = express.Router()

const controller = new StationsController()
const checkAuthorization = new AuthMiddleware(controller)
const checkOwner = new CheckOwnerMiddleware()
const hateoas = new HateoasMiddleware()

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
  hateoas.addLinks,
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
  checkAuthorization.checkAuthorization.bind(checkAuthorization),
  hateoas.addLinks,
  (req, res) => controller.registerStation(req, res)
)

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
  hateoas.addLinks,
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
router.put(
  '/:id', 
  checkAuthorization.checkAuthorization.bind(checkAuthorization),
  checkOwner.checkOwnerStation.bind(checkOwner),
  hateoas.addLinks,
  (req, res) => controller.updateStation(req, res)
)

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
router.delete(
  '/:id', 
  checkAuthorization.checkAuthorization.bind(checkAuthorization),
  checkOwner.checkOwnerStation.bind(checkOwner),
  hateoas.addLinks,
  (req, res) => controller.deleteStation(req, res)
)

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
 *        stationname:
 *          type: string
 *          description: The name of the weather station.
 *        description:
 *          type: string
 *          description: A description of the weather station.
 *        latitude:
 *          type: number
 *          description: The latitude of the weather station.
 *        longitude:
 *          type: number
 *          description: The longitude of the weather station.
 *        owner:
 *          type: string
 *          description: The owner of the weather station.
 *
 *    WeatherStationRegistration:
 *      type: object
 *      properties:
  *        stationname:
 *          type: string
 *          description: The name of the weather station.
 *        description:
 *          type: string
 *          description: A description of the weather station.
 *        latitude:
 *          type: number
 *          description: The latitude of the weather station.
 *        longitude:
 *          type: number
 *          description: The longitude of the weather station.
 */
