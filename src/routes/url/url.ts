import express from 'express'
import { UrlController } from '../../controllers/urlController/urlController'
const urlController =  new UrlController()
const urlRouter = express.Router()
urlRouter.get('/:short',urlController.redirectUrl)
urlRouter.post('/',urlController.createShortUrl)
export {urlRouter}