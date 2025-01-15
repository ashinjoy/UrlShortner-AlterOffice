import { INewUrl, IUrl } from "./urInterface";

export interface IUrlRepository{
    createUrlData(data:INewUrl):Promise<IUrl>
    getUrlByShort(short:string):Promise<any>
}   