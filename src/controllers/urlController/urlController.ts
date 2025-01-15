import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import { urlModel } from "../../models/urlModel";
import { analyticsModel } from "../../models/redirectLogs";
import useragent from 'useragent'


export class UrlController{
   async createShortUrl(req:Request,res:Response,next:NextFunction){
        try {
          const {longUrl,customAlias,topic} = req.body 
          let short 
          if(!customAlias){
            const { randomUUID } = new ShortUniqueId({ length: 7 });
            short = randomUUID()
            console.log(short);
            
          } else{
            short = customAlias

          }
          const shortUrl = `${req.protocol}://${req.headers.host}/${short}`
          console.log(shortUrl)
        const createUrl =   await urlModel.create({
            longUrl,
            shortUrl,
            topic,
            short
          })
          res.status(200).json({messgae:"success"})
         
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
   async redirectUrl(req:Request,res:Response,next:NextFunction){
        try {
            const {short} = req.params
            console.log(short);
         const shortUrl = `${req.protocol}://${req.headers.host}/${short}`
        const response =  await urlModel.findOne({shortUrl:shortUrl})

  // Get client IP address
   const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  const agent = useragent.parse(req.headers['user-agent']);
  const deviceName = agent.device.family || 'Unknown Device'; // e.g., "Desktop" or specific device info
  const os = agent.os.toString(); // e.g., "Windows 10"

  // Log the details (optional)
  console.log(`Client IP: ${clientIp}`);
  console.log(`Device Name: ${deviceName}`);
  console.log(`OS: ${os}`);
     const userAgent =      req.headers["user-agent"]
        urlModel.findOneAndUpdate({shortUrl},{$inc:{totalClicks:1}})
        analyticsModel.create({
          url_id:response?._id,
          os_name:os,
          device_name:deviceName,
          ip_address:clientIp,
          user_agent:userAgent
        })
        if(!response?.longUrl){
            throw new Error('err')
        }
        res.redirect(response.longUrl)
        } catch (error) {
            console.error(error);
            next(error)
        }

    }
}