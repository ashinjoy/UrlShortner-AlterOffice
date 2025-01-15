import { Model } from "mongoose";
import { IClick, INewClick } from "../interface/redirectInterface";

export class AnalyticsRepository {
  clicksModel: Model<IClick>;
  constructor(clicksModel: Model<IClick>) {
    this.clicksModel = clicksModel;
  }
  async createClicks(data: INewClick): Promise<IClick> {
    try {
      return await this.clicksModel.create(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAnalyticsOfSpecificUrl(alias: string): Promise<any> {
    try {
      console.log(alias);
      const analytics = await this.clicksModel.aggregate([
        {
          $match: {
            short: alias,
          },
        },
        {
          $facet: {
            totalClicks: [{ $count: "count" }],
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
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
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
              {
                $project: {
                  _id: 0,
                  date: "$_id",
                  totalClicks: "$count",
                },
              },
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
      console.log(
        "analytics of a specified URL",
        analytics[0].totalClicks,
        analytics[0].uniqueUsers,
        analytics[0].clicksByDate,
        analytics[0].osType,
        analytics[0].deviceType
      );
      return {
        totalClicks: analytics[0].totalClicks[0].count,
        uniqueUsers: analytics[0].uniqueUsers[0].count,
        clicksByDate: analytics[0].clicksByDate,
        osType: analytics[0].osType,
        deviceType: analytics[0].deviceType,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAnalyticsOfSpecificTopic(topic: string) {
    try {
      const analytics = await this.clicksModel.aggregate([
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
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
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
              {
                $project: {
                  _id: 0,
                  date: "$_id",
                  totalClicks: "$clicks",
                },
              },
            ],
            urls: [
              {
                $group: {
                  _id: "$topic",
                  totalClicks: { $sum: 1 },
                  uniqueUsers: { $addToSet: "$ip_address" },
                },
              },
              {
                $project: {
                  _id: 0,
                  topic: "$_id",
                  totalClicks: 1,
                  uniqueUsers: { $size: "$uniqueUsers" },
                },
              },
            ],
          },
        },
      ]);
      console.log(
        "analytics of a specified URL",
        analytics[0].totalClicks,
        analytics[0].uniqueUsers,
        analytics[0].clicksByDate,
        analytics[0].urls
      );
      return {
        totalClicks: analytics[0].totalClicks[0].count,
        uniqueUsers: analytics[0].uniqueUsers[0].count,
        clicksByDate: analytics[0].clicksByDate,
        urls: analytics[0].urls,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getOverallAnalytics(){
    try {
        const analytics = await this.clicksModel.aggregate([
            {
              $facet: {
                totalClicks: [{ $count: "count" }],
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
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
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
                  {
                    $project: {
                      _id: 0,
                      date: "$_id",
                      totalClicks: "$count",
                    },
                  },
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
          console.log(
            "analytics of a specified URL",
            analytics[0].totalClicks,
            analytics[0].uniqueUsers,
            analytics[0].clicksByDate,
            analytics[0].osType,
            analytics[0].deviceType
          );
          return {
            totalClicks: analytics[0].totalClicks[0].count,
            uniqueUsers: analytics[0].uniqueUsers[0].count,
            clicksByDate: analytics[0].clicksByDate,
            osType: analytics[0].osType,
            deviceType: analytics[0].deviceType,
          };
        
    } catch (error) {
        console.error(error);
        throw error
    }
  }
}