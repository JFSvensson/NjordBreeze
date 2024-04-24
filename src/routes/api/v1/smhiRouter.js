/**
 * @file Defines the smhi station router for the application.
 * @module router
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */
import express from 'express'
import { SMHIController } from '../../../controllers/api/v1/smhiController.js'
import { HateoasMiddleware } from '../../../middleware/hateoasMiddleware.js'

export const router = express.Router()

const smhiController = new SMHIController()
const hateoas = new HateoasMiddleware()

router.get(
  '/stations',
  hateoas.addLinks, 
 (req, res) => smhiController.getStations(req, res)
)
