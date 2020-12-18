import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import {createContext, useEffect, useReducer, useState} from "react";
import CommentReducer, {
    CommentDeleteActionCreator,
    CommentInsertActionCreator,
    CommentsReadActionCreator,
    CommentUpdateActionCreator
} from "../Reducers/CommentReducer";
import {CommentApiDataManager} from "./ApiFunctions/CommentApiDataManager";
import React from "react";
import CustomerReducer, {
    CustomerDeleteActionCreator,
    CustomerInsertActionCreator,
    CustomerReadAllActionCreator,
    CustomerUpdateActionCreator
} from "../Reducers/CustomerReducer";
import {CustomerApiDataManager} from "./ApiFunctions/CustomerApiDataManager";

type DataContextState = {
    isLoading : boolean,
    Data : CustomerInfo[] ,
    Func: {
            GetData : () => void,
            PostData : (data : CustomerInfo) => void,
            PutData : (id : number, data:CustomerInfo) => void,
            DeleteData : (id : number) => void,
            GetChildCars : (customerId : number) => Promise<CarInfo[]>,
            GetChildComments : (customerId : number) => Promise<CommentInfo[]>
    }
}

export const CustomerDataContext = createContext<DataContextState>({} as DataContextState);
export const CustomerDataContextProvider : React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [state,dispatch] = useReducer(CustomerReducer,[]);

    useEffect(() => {
        getData();
    },[])

    // region Valueで渡すメソッド
    const getData = () => {
        setIsLoading(true)
        new CustomerApiDataManager().GetData().then(res => {
            dispatch(CustomerReadAllActionCreator(res))
            setIsLoading(false)
        }).catch(err => console.log(err));
    }

    const insertData = (data : CustomerInfo) => {
        new CustomerApiDataManager()
            .PostData(data)
            .then(res => dispatch(CustomerInsertActionCreator(res)))
            .catch(err => console.log(err));
    }
    const updateData = (id : number,data : CustomerInfo) => {
        new CustomerApiDataManager()
            .PutData(id,data)
            .then(res => dispatch(CustomerUpdateActionCreator(id,res)))
            .catch(err => console.log(err));
    }
    const deleteData = (id : number) => {
        new CustomerApiDataManager()
            .DeleteData(id)
            .then(res => dispatch(CustomerDeleteActionCreator(id)))
            .catch(err => console.log(err));
    }
    // endregion

    return (
        <CustomerDataContext.Provider value={{
            isLoading : isLoading,
            Data : state,
            Func : {
                GetData : getData,
                PostData : insertData,
                PutData : updateData,
                DeleteData : deleteData,
                GetChildComments : new CustomerApiDataManager().GetChildComments,
                GetChildCars : new CustomerApiDataManager().GetChildCars
            }
        }}>
            {children}
        </CustomerDataContext.Provider>
    )

}