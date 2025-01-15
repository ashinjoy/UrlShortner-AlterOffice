import { NextFunction, Request, Response } from "express";
import { analyticsModel } from "../../models/redirectLogs";
import { IAnalyticsService } from "../../interface/redirectInterface";

export class AnalysticsController {
  analyticsService:IAnalyticsService
  constructor(analyticsService:IAnalyticsService){
    this.analyticsService = analyticsService
  }
  async getAnalyticsOfSpecificUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { alias } = req.params as {alias:string};
    const analyticsData =  await this.analyticsService.analyticsServiceOfSpecificUrl(alias)
    res.status(200).json(analyticsData)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async anaylyticsOfSpecificTopic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { topic } = req.params;
     const analytics =  await this.analyticsService.analyticsServiceOfSpecificTopic(topic)
     res.status(200).json(analytics)
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async overallAnalytics(req:Request,res:Response,next:NextFunction){
    try {
    const analytics = await this.analyticsService.overallAnalytics()
      res.status(200).json(analytics)
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
