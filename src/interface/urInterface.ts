import { Document } from "mongoose";

export interface IUrl extends Document {
  _id: string;
  longUrl: string;
  short: string;
  topic: string;
  createdAt?: Date;
  // totalClicks:number
}
export interface INewUrl {
  longUrl: string;
  short: string;
  topic: string | undefined;
}

export interface IUrlBody {
  longUrl: string;
  customAlias: string | undefined;
  topic: string | undefined;
}

export interface IUrlServiceData {
  shortUrl: string;
  createdAt?: Date;
}

export interface IClickMetaData {
  short: string;
  clientIp: string ;
  user_agent: string;
  deviceName: string;
  os: string;
}

export interface IUrlService {
  createShortUrlService(urlBody: IUrlBody): Promise<IUrlServiceData>;
  redirectUrlService(data: IClickMetaData): Promise<string>;
}
