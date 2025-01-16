import express from 'express'
import { AnalysticsController } from '../../controllers/analyticsController/analytics'
import { AnalyticsService } from '../../services/analyticsService'
import { AnalyticsRepository } from '../../repository/analyticsRepository'
import { analyticsModel } from '../../models/redirectLogs'
import { AuthMiddleware } from '../../middlwares/authMiddleware'

const analyticRouter = express.Router()

const analyticsRepository = new AnalyticsRepository(analyticsModel)
const analyticService = new AnalyticsService(analyticsRepository)
const analyticsController = new AnalysticsController(analyticService)
analyticRouter.get('/overall',AuthMiddleware.isAuthenticated,analyticsController.overallAnalytics.bind(analyticsController))
analyticRouter.get('/topic/:topic',AuthMiddleware.isAuthenticated,analyticsController.anaylyticsOfSpecificTopic.bind(analyticsController))
analyticRouter.get('/:alias',AuthMiddleware.isAuthenticated,analyticsController.getAnalyticsOfSpecificUrl.bind(analyticsController))
export {analyticRouter}