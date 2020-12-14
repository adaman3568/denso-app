import {CustomerInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class CustomerApiDataManager implements IApiDataManager<CustomerInfo>{

    path: string = `${apiEndPointBase}customers`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    async GetData(): Promise<CustomerInfo[]> {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as CustomerInfo[];
    }
}