import {CarInfo, CommentInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class CarApiDataManager implements IApiDataManager<CarInfo>{

    path: string = `${apiEndPointBase}cars`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    GetData = async (): Promise<CarInfo[]> => {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as CarInfo[];
    }

    DeleteData = async (id: number): Promise<void> => {
        await axios.delete(`${this.path}/${id}` ,this.requestHelper.getHeader());
    }

    PostData = async (data: CarInfo,parentCustomerId : number): Promise<CarInfo> => {
        const res = await axios.post(`${this.path}/${parentCustomerId}` ,data,this.requestHelper.getHeader());
        return res.data as CarInfo
    }

    PutData = async (id: number, data: CarInfo): Promise<CarInfo> => {
        const res = await axios.put(`${this.path}/${id}`,data,this.requestHelper.getHeader());
        return res.data as CarInfo
    }

    GetChildComment = async (carId : number) : Promise<CommentInfo[]> => {
        const res = await axios.get(`${apiEndPointBase}cars/${carId}/comments`,this.requestHelper.getHeader())
        return res.data as CommentInfo[];
    }
}