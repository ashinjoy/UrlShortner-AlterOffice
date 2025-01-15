import { Document, ObjectId } from "mongoose";

export interface IClick extends Document {
  _id: string;
  url_id: ObjectId;
  short: string;
  topic: string;
  os_name: string;
  device_name: string;
  ip_address: string;
  user_agent: string;
}

export interface INewClick {
  url_id: ObjectId;
  short: string;
  topic: string;
  os_name: string;
  device_name: string;
  ip_address: string;
  user_agent: string;
}

export interface IAnalyticsService{
    analyticsServiceOfSpecificUrl(alias:string):void
    analyticsServiceOfSpecificTopic(topic:string):void
    overallAnalytics():void
}
