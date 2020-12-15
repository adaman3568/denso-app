import {CustomerInfo, EmployeeInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class EmpApiDataManager implements IApiDataManager<EmployeeInfo>{

    path: string = `${apiEndPointBase}users`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    GetData = async (): Promise<EmployeeInfo[]> => {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as EmployeeInfo[];
    };

    DeleteData = async (id: number): Promise<void> => {
        await axios.delete(`${this.path}/${id}` ,this.requestHelper.getHeader());
    };

    PostData = async (data: EmployeeInfo): Promise<EmployeeInfo> => {
        const res = await axios.post(`${this.path}`,data ,this.requestHelper.getHeader());
        return res.data as EmployeeInfo
    };

    PutData = async (id: number, data: EmployeeInfo): Promise<EmployeeInfo> => {
        const res = await axios.put(`${this.path}/${id}`,data ,this.requestHelper.getHeader());
        return res.data as EmployeeInfo
    };
}