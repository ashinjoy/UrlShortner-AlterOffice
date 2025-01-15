import express from 'express'
import { UrlController } from '../../controllers/urlController/urlController'
import { UrlService } from '../../services/urlService'
import { UrlRepository } from '../../repository/urlRepository'
import { urlModel } from '../../models/urlModel'
import { rateLimiter } from '../../middlwares/rateLimiter'
import { AnalyticsRepository } from '../../repository/analyticsRepository'
import { analyticsModel } from '../../models/redirectLogs'

const urlRouter = express.Router()

const urlRepository = new UrlRepository(urlModel)
const analyticsRepository = new AnalyticsRepository(analyticsModel)
const urlService = new UrlService(urlRepository,analyticsRepository)

const urlController =  new UrlController(urlService)
urlRouter.get('/:short',urlController.redirectUrl.bind(urlController))
urlRouter.post('/shorten',rateLimiter,urlController.createShortUrl.bind(urlController))

export {urlRouter}