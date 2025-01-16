import ShortUniqueId from "short-unique-id";
import {
  IClickMetaData,
  IUrlBody,
  IUrlServiceData,
} from "../interface/urInterface";
import { IUrlRepository } from "../interface/urlRepositoryInterface";
import { IAnalyticsRepository } from "../interface/analyticsRepository";
import { redisClient } from "../config/redis";

export class UrlService {
  urlRepository: IUrlRepository;
  analyticsRepository: IAnalyticsRepository;
  constructor(
    urlRepository: IUrlRepository,
    analyticsRepository: IAnalyticsRepository
  ) {
    this.urlRepository = urlRepository;
    this.analyticsRepository = analyticsRepository;
  }
  async createShortUrlService(data: IUrlBody): Promise<IUrlServiceData> {
    let short;
    let urlData;
    if (!data.customAlias) {
      const { randomUUID } = new ShortUniqueId({ length: 7 });
      short = randomUUID();
    } else {
      short = data.customAlias;
    }
    urlData = await this.urlRepository.getUrlByShort(short);
    console.log("urlData", urlData);
    if (!urlData) {
      const urlEntity = {
        longUrl: data.longUrl,
        short: short,
        topic: data.topic,
      };
      urlData = await this.urlRepository.createUrlData(urlEntity);
    }
    return {
      shortUrl: urlData.short,
      createdAt: urlData.createdAt,
    };
  }
  async redirectUrlService(data: IClickMetaData): Promise<string> {
    try {
      const isCached = await redisClient.get(data.short);
      let parsedJSONCache;
      if (!isCached) {
        const getOriginalUrl = await this.urlRepository.getUrlByShort(
          data.short
        );
        const cachedData = {
          _id: getOriginalUrl._id,
          topic: getOriginalUrl.topic,
          longUrl: getOriginalUrl.longUrl,
        };
        await redisClient.set(data.short, JSON.stringify(cachedData), {
          EX: 3600,
        });
        parsedJSONCache = { ...getOriginalUrl._doc };
      } else {
        parsedJSONCache = JSON.parse(isCached);
      }
      console.log(parsedJSONCache);
      const createClicksMetaData = await this.analyticsRepository.createClicks({
        url_id: parsedJSONCache._id,
        short: data.short,
        topic: parsedJSONCache.topic,
        os_name: data.os,
        device_name: data.deviceName,
        ip_address: data.clientIp,
        user_agent: data.user_agent,
      });
      return parsedJSONCache.longUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
