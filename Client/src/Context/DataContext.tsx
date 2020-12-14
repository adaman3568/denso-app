import {createContext, FC, useEffect, useState} from "react";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import React from 'react'
import {CommentApiDataManager} from "./ApiFunctions/CommentApiDataManager";
import {EmpApiDataManager} from "./ApiFunctions/EmpApiDataManager";
import {CarApiDataManager} from "./ApiFunctions/CarApiDataManager";
import {CustomerApiDataManager} from "./ApiFunctions/CustomerApiDataManager";

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

    const commentDataManager = new CommentApiDataManager();
    const carDataManager = new CarApiDataManager();
    const customerDataManager = new CustomerApiDataManager();
    const empDataManager = new EmpApiDataManager();

    const getAllData = async () => {
        commentDataManager.GetData().then(res => setComments(res));
        carDataManager.GetData().then(res => setCars(res));
        empDataManager.GetData().then(res => setEmployees(res));
        customerDataManager.GetData().then(res => setCustomers(res));
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