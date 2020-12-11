import {createContext, FC, useEffect, useState} from "react";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import Cookies from "js-cookie";
import axios from 'axios'
import {apiEndPointBase} from "../Firebase";
import React from 'react'

type DataContextState = {
    isLoading : boolean,
    dataInit : () => void
    Car : {Data : CarInfo[] , Func: {}}
    Emp : {Data : EmployeeInfo[] , Func: {}}
    Customer : {Data : CustomerInfo[] , Func: {}}
    Comments : {Data : CommentInfo[] , Func: {}}
}

export const DataContext = createContext<DataContextState>({} as DataContextState)

type dataContextInnerStateType = {
    CarArray : CarInfo[]
    EmpArray : EmployeeInfo[],
    CustomerArray : CustomerInfo[],
    CommentArray : CommentInfo[],
}

const DataContextProvider : FC = ({children}) => {

    const [dataContextInnerState, setDataContextInnerState]  = useState<dataContextInnerStateType>({CarArray : [],EmpArray : [],CustomerArray : [],CommentArray : []});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getRequestHeader = () => {
        const token = Cookies.get("denso-app-jwt-token");
        return ({headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }})
    };

    // region 初期データ取得メソッド
    const getCarArray = async () : Promise<CarInfo[]> => {
        const path = `${apiEndPointBase}cars`;
        const res = await axios.get(path,getRequestHeader());
        console.log(res);
        return res.data as CarInfo[]
    };
    const getEmpArray = async () : Promise<EmployeeInfo[]> => {
        const path = `${apiEndPointBase}users`;
        const res = await axios.get(path,getRequestHeader());
        console.log(res);
        return res.data as EmployeeInfo[]
    };
    const getCommentArray = async () : Promise<CommentInfo[]> => {
        const path = `${apiEndPointBase}comments`;
        const res = await axios.get(path,getRequestHeader());
        console.log(res);
        return res.data as CommentInfo[]
    };
    const getCustomerArray = async () : Promise<CustomerInfo[]> => {
        const path = `${apiEndPointBase}customers`;
        const res = await axios.get(path,getRequestHeader());
        console.log(res);
        return res.data as CustomerInfo[]
    };

    const getAllData = () => {
        getCarArray().then(res => setDataContextInnerState({...dataContextInnerState,CarArray : res}));
        getEmpArray().then(res => setDataContextInnerState({...dataContextInnerState,EmpArray : res}));
        getCommentArray().then(res => setDataContextInnerState({...dataContextInnerState,CommentArray : res}));
        getCustomerArray().then(res => setDataContextInnerState({...dataContextInnerState,CustomerArray : res}));
    }
    // endregion

    const dataInit = () => {
        setIsLoading(true);
        getAllData();
        setIsLoading(false)
    };

    return(
        <DataContext.Provider value={{
                Car :
                    {Data : dataContextInnerState.CarArray, Func : {}},
                Emp :
                    {Data : dataContextInnerState.EmpArray , Func : {}},
                Customer :
                    {Data : dataContextInnerState.CustomerArray,Func : {}},
                Comments :
                    {Data : dataContextInnerState.CommentArray,Func : {}},
            isLoading,
            dataInit
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContextProvider