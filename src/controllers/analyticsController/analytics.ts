import { NextFunction, Request, Response } from "express";
import { analyticsModel } from "../../models/redirectLogs";

export class AnalysticsController {
  async getAnalyticsOfSpecificUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { short } = req.params;
      const analytics = await analyticsModel.aggregate([
        {
          $match: {
            short: short,
          },
        },
        {
          $facet: {
            totalCliks: [{ $count: "count" }],
            uniqueUsers: [
              {
                $group: { _id: "$ip_address" },
              },
              {
                $count: "count",
              },
            ],
            clicksByDate: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%y-%m-%d", date: "$createdAt" },
                  },
                  count: { $sum: 1 },
                },
              },
              {
                $sort: {
                  _id: -1,
                },
              },
              { $limit: 7 },
            ],
            osType: [
              {
                $group: {
                  _id: "$os_name",
                  uniqueClicks: { $sum: 1 },
                  uniqueUsers: { $addToSet: "$ip_address" },
                },
              },
              {
                $project: {
                  os_name: "$_id",
                  uniqueClicks: 1,
                  uniqueUsers: { $size: "$uniqueUsers" },
                },
              },
            ],
            deviceType: [
              {
                $group: {
                  _id: "$device_name",
                  uniqueClicks: { $sum: 1 },
                  uniqueUsers: { $addToSet: "$ip_address" },
                },
              },
              {
                $project: {
                  device_name: "$_id",
                  uniqueClicks: 1,
                  uniqueUsers: { $size: "$uniqueUsers" },
                },
              },
            ],
          },
        },
      ]);
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
      const analytics = await analyticsModel.aggregate([
        {
          $match: {
            topic: topic,
          },
        },
        {
          $facet: {
            totalClicks: [{ $count: "count" }],
            uniqueUsers: [
              { $group: { _id: "$ip_address" } },
              { $count: "count" },
            ],
            clicksByDate: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%y-%m-%d", date: "$createdAt" },
                  },
                  clicks: { $sum: 1 },
                },
              },
              {
                $sort: { _id: -1 },
              },
              {
                $limit: 7,
              },
            ],
            urls:[
                {
                   $group:{
                    _id:'$topic',
                    totalClicks:{$sum:1},
                    uniqueUsers:{$addToSet:'$ip_address'}
                   }
                }
            ]
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
