import {ApiRequestHelper} from "./ApiRequestHelper";

export interface IApiDataManager<T> {
    path:string;
    requestHelper:ApiRequestHelper;
    GetData():Promise<T[]>;
}