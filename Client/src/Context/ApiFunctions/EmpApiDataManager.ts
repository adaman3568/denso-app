import {EmployeeInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class EmpApiDataManager implements IApiDataManager<EmployeeInfo>{

    path: string = `${apiEndPointBase}users`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    async GetData(): Promise<EmployeeInfo[]> {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as EmployeeInfo[];
    }
}