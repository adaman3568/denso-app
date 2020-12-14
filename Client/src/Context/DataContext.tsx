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

    const [cars,setCars] = useState<CarInfo[]>([]);
    const [employees,setEmployees] = useState<EmployeeInfo[]>([]);
    const [customers,setCustomers] = useState<CustomerInfo[]>([]);
    const [comments,setComments] = useState<CommentInfo[]>([]);
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

    const getAllData = async () => {
        getCarArray().then(res => setCars(res));
        getEmpArray().then(res => setEmployees(res));
        getCommentArray().then(res => setComments(res));
        getCustomerArray().then(res => setCustomers(res));
    };
    // endregion

    const dataInit = async () => {
        setIsLoading(true);
        await getAllData();
        setIsLoading(false)
    };

    return(
        <DataContext.Provider value={{
                Car :
                    {Data : cars, Func : {}},
                Emp :
                    {Data : employees , Func : {}},
                Customer :
                    {Data : customers,Func : {}},
                Comments :
                    {Data :comments,Func : {}},
            isLoading,
            dataInit
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContextProvider