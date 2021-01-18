import {EmployeeInfo,CommentInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class ProfileApiDataManager{

    path: string = `${apiEndPointBase}Profile`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    GetData = async (): Promise<EmployeeInfo> => {
        const res = await axios.get(`${this.path}/myprofile`,this.requestHelper.getHeader());
        console.log(res)
        return res.data as EmployeeInfo;
    };

    GetComment = async () : Promise<CommentInfo[]> => {
        const res = await axios.get(`${this.path}/mycomments`,this.requestHelper.getHeader());
        console.log(res)
        return res.data as CommentInfo[];
    }
}