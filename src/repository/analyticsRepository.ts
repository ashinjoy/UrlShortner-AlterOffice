import { Model } from "mongoose";
import { IClick, INewClick } from "../interface/redirectInterface";

export class AnalyticsRepository{
    clicksModel:Model<IClick>
    constructor(clicksModel:Model<IClick>){
        this.clicksModel = clicksModel
    }
   async createClicks(data:INewClick):Promise<IClick>{
    try {
        return await this.clicksModel.create(data)
    } catch (error) {
        console.error(error);
        throw error
    }
    }
}