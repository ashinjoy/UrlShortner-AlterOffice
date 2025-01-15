import { INewClick, IClick } from "./redirectInterface";

export interface IAnalyticsRepository{
    createClicks(data:INewClick):Promise<IClick>

}