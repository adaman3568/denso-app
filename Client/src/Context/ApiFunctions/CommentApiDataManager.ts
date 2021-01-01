import {CarInfo, CommentInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";
import {dark} from "@material-ui/core/styles/createPalette";

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
    };

    PostData = async (parentCarId : number,data: CommentInfo): Promise<CommentInfo> => {
        const res = await axios.post(`${this.path}/${parentCarId}`,data ,this.requestHelper.getHeader());
        return res.data as CommentInfo
    };

    PutData = async (id: number, data: CommentInfo): Promise<CommentInfo> => {
        const res = await axios.put(`${this.path}/${id}`,data ,this.requestHelper.getHeader());
        return res.data as CommentInfo
    }

    PostRepComment = async (parentCommentID: number, comment: CommentInfo) : Promise<void> => {
        await axios.post(`${this.path}/rep/${parentCommentID}`,comment,this.requestHelper.getHeader());
    }
}