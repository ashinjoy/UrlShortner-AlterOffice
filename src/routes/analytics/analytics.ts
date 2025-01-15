import express from 'express'
import { AnalysticsController } from '../../controllers/analyticsController/analytics'
import { AnalyticsService } from '../../services/analyticsService'
import { AnalyticsRepository } from '../../repository/analyticsRepository'
import { analyticsModel } from '../../models/redirectLogs'

const analyticRouter = express.Router()

const analyticsRepository = new AnalyticsRepository(analyticsModel)
const analyticService = new AnalyticsService(analyticsRepository)
const analyticsController = new AnalysticsController(analyticService)
analyticRouter.get('/overall',analyticsController.overallAnalytics.bind(analyticsController))
analyticRouter.get('/topic/:topic',analyticsController.anaylyticsOfSpecificTopic.bind(analyticsController))
analyticRouter.get('/:alias',analyticsController.getAnalyticsOfSpecificUrl.bind(analyticsController))
export {analyticRouter}