import {CarInfo, CommentInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class CommentApiDataManager implements IApiDataManager<CommentInfo>{

    path: string = `${apiEndPointBase}comments`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    GetData = async (): Promise<CommentInfo[]> => {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as CommentInfo[];
    }

    DeleteData = async (id: number): Promise<void> => {
        await axios.delete(`${this.path}/${id}` ,this.requestHelper.getHeader());
    }

    PostData = async (data: CommentInfo): Promise<CommentInfo> => {
        const res = await axios.post(`${this.path}`,data ,this.requestHelper.getHeader());
        return res.data as CommentInfo
    }

    PutData = async (id: number, data: CommentInfo): Promise<CommentInfo> => {
        const res = await axios.put(`${this.path}/${id}`,data ,this.requestHelper.getHeader());
        return res.data as CommentInfo
    }
}