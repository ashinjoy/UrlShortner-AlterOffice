import ShortUniqueId from "short-unique-id";
import { IUrlBody, IUrlServiceData } from "../interface/urInterface";
import { IUrlRepository } from "../interface/urlRepositoryInterface";
import { urlRouter } from "../routes/url/url";

export class UrlService {
  urlRepository: IUrlRepository;
  constructor(urlRepository: IUrlRepository) {
    this.urlRepository = urlRepository;
  }
  async createShortUrlService(data: IUrlBody):Promise<IUrlServiceData> {
    let short;
    let urlData;
    if (!data.customAlias) {
      const { randomUUID } = new ShortUniqueId({ length: 7 });
      short = randomUUID();
    } else {
      short = data.customAlias;
    }
    urlData = await this.urlRepository.getUrlByShort(short)
    console.log('urlData',urlData)
    if(!urlData){
        const urlEntity = {
            longUrl:data.longUrl,
            short:short,
            topic:data.topic 
        }
       urlData =  await this.urlRepository.createUrlData(urlEntity)
       console.log('inside the loop',urlData)
    }
console.log('urlDataaa',urlData)
    return {
        shortUrl:urlData.short,
        createdAt:urlData.createdAt
    }
  }
}
