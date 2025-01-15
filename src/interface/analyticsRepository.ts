import { INewClick, IClick } from "./redirectInterface";

export interface IAnalyticsRepository{
    createClicks(data:INewClick):Promise<IClick>
    getAnalyticsOfSpecificUrl(data:string):Promise<void>
    getAnalyticsOfSpecificTopic(data:string):Promise<any>
    getOverallAnalytics():Promise<any>
}