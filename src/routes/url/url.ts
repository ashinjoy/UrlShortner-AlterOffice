import express from 'express'
import { UrlController } from '../../controllers/urlController/urlController'
import { UrlService } from '../../services/urlService'
import { UrlRepository } from '../../repository/urlRepository'
import { urlModel } from '../../models/urlModel'
import { rateLimiter } from '../../middlwares/rateLimiter'

const urlRouter = express.Router()

const urlRepository = new UrlRepository(urlModel)

const urlService = new UrlService(urlRepository)

const urlController =  new UrlController(urlService)
// urlRouter.get('/:short',urlController.redirectUrl)
urlRouter.post('/shorten',rateLimiter,urlController.createShortUrl.bind(urlController))
export {urlRouter}