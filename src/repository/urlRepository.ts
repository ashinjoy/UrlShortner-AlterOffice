import { Model } from "mongoose";
import { INewUrl, IUrl } from "../interface/urInterface";



export class UrlRepository{
    urlModel:Model<IUrl>
    constructor(urlModel:Model<IUrl>){
        this.urlModel = urlModel
    }
    async createUrlData(data:INewUrl):Promise<IUrl>{
        try {
            return await this.urlModel.create(data)
        } catch (error) {
            console.error(error);
            throw error
        }
    }
    async getUrlByShort(short:string):Promise<any>{
        try {
            // return await this.urlModel.find({short})
            return await this.urlModel.findOne({short})
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}