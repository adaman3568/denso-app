import {createContext, useEffect, useReducer, useState} from "react";
import React from "react";
import {EmployeeInfo} from "./DataTypeList";
import EmployeeReducer, {
    EmpDeleteActionCreator,
    EmpInsertActionCreator,
    EmpReadAllActionCreator,
    EmpUpdateActionCreator
} from "../Reducers/EmpReducer";
import {EmpApiDataManager} from "./ApiFunctions/EmpApiDataManager";

type DataContextState = {
    isLoading : boolean,
    Data : EmployeeInfo[] ,
    Func: {
            GetData : () => void,
            PostData : (data : EmployeeInfo,parentCustomerId : number) => void,
            PutData : (id : number, data:EmployeeInfo) => void,
            DeleteData : (id : number) => void}
}

export const EmpDataContext = createContext<DataContextState>({} as DataContextState);
export const EmpDataContextProvider : React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [state,dispatch] = useReducer(EmployeeReducer,[]);

    useEffect(() => {
        getData();
    },[])

    // region Valueで渡すメソッド
    const getData = () => {
        setIsLoading(true)
        new EmpApiDataManager().GetData().then(res => {
            dispatch(EmpReadAllActionCreator(res))
            setIsLoading(false)
        }).catch(err => console.log(err));
    }

    const insertData = (data : EmployeeInfo) => {
        new EmpApiDataManager()
            .PostData(data)
            .then(res => dispatch(EmpInsertActionCreator(res)))
            .catch(err => console.log(err));
    }
    const updateData = (id : number,data : EmployeeInfo) => {
        new EmpApiDataManager()
            .PutData(id,data)
            .then(res => dispatch(EmpUpdateActionCreator(id,res)))
            .catch(err => console.log(err));
    }
    const deleteData = (id : number) => {
        new EmpApiDataManager()
            .DeleteData(id)
            .then(res => dispatch(EmpDeleteActionCreator(id)))
            .catch(err => console.log(err));
    }
    // endregion

    return (
        <EmpDataContext.Provider value={{
            isLoading : isLoading,
            Data : state,
            Func : {
                GetData : getData,
                PostData : insertData,
                PutData : updateData,
                DeleteData : deleteData
            }
        }}>
            {children}
        </EmpDataContext.Provider>
    )
}