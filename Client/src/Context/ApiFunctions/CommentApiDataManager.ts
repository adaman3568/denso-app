import {CommentInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class CommentApiDataManager implements IApiDataManager<CommentInfo>{

    path: string = `${apiEndPointBase}comments`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    async GetData(): Promise<CommentInfo[]> {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as CommentInfo[];
    }
}