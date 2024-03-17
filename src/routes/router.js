/**
 * @file Defines the main router for the application.
 * @module router
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import express from 'express'
import { router as v1Router } from '.api/v1/router.js'

export const router = express.Router()

router.use('/api/v1', v1Router)

//Error handling
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
