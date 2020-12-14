import {CommentInfo, CustomerInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class CustomerApiDataManager implements IApiDataManager<CustomerInfo>{

    path: string = `${apiEndPointBase}customers`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    GetData = async (): Promise<CustomerInfo[]> => {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as CustomerInfo[];
    }

    DeleteData = async (id: number): Promise<void> => {
        await axios.delete(`${this.path}/${id}` ,this.requestHelper.getHeader());
    }

    PostData = async (data: CustomerInfo): Promise<CustomerInfo> => {
        const res = await axios.post(`${this.path}`,data ,this.requestHelper.getHeader());
        return res.data as CustomerInfo
    }

    PutData = async (id: number, data: CustomerInfo): Promise<CustomerInfo> => {
        const res = await axios.put(`${this.path}/${id}`,data ,this.requestHelper.getHeader());
        return res.data as CustomerInfo
    }
}