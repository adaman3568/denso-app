import {CarInfo} from "../DataTypeList";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {IApiDataManager} from "./IApiDataManager";
import {ApiRequestHelper} from "./ApiRequestHelper";

export class CarApiDataManager implements IApiDataManager<CarInfo>{

    path: string = `${apiEndPointBase}cars`;
    requestHelper: ApiRequestHelper = new ApiRequestHelper();

    async GetData(): Promise<CarInfo[]> {
        const res = await axios.get(this.path,this.requestHelper.getHeader());
        console.log(res);
        return res.data as CarInfo[];
    }
}