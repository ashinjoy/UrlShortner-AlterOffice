import { NextFunction, Request, Response } from "express";


import useragent from "useragent";
import { IUrlService } from "../../interface/urInterface";
import { BadRequestError } from "../../errors/badrequest";

export class UrlController {
  urlService: IUrlService;
  constructor(urlService: IUrlService) {
    this.urlService = urlService;
  }
  async createShortUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { longUrl, customAlias, topic } = req.body as {
        longUrl: string;
        customAlias: string;
        topic: string;
      };
      if (!longUrl) {
        throw new BadRequestError("Bad Request");
      }
      const urlData = await this.urlService.createShortUrlService({
        longUrl,
        customAlias,
        topic,
      });
      const shortUrl = `${req.protocol}://${req.headers.host}/api/v1/url/${urlData.shortUrl}`;
      res.status(200).json({
        message: "success",
        shortUrl: shortUrl,
        createdAt: urlData.createdAt,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async redirectUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { short } = req.params as { short: string };
      if (!short) {
        throw new BadRequestError("Bad request");
      }

      let clientIp =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
        if(Array.isArray(clientIp)){
          clientIp = clientIp[0]
        }
      const agent = useragent.parse(req.headers["user-agent"]);
      const deviceName = agent.device.family || "Unknown Device";
      const os = agent.os.toString();
      const user_agent = req.headers["user-agent"] || "unknown agent";
      const getLongUrl = await this.urlService.redirectUrlService({
        short,
        clientIp : clientIp || "ip not available",
        deviceName,
        user_agent,
        os,
      });
      res.redirect(getLongUrl);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
