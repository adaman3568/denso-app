import {CarInfo, CommentInfo} from "./DataTypeList";
import {createContext, useEffect, useReducer, useState} from "react";
import React from "react";
import CarReducer, {
    CarDeleteActionCreator,
    CarInsertActionCreator, CarReadAllActionCreator,
    CarUpdateActionCreator
} from "../Reducers/CarReducer";
import {CarApiDataManager} from "./ApiFunctions/CarApiDataManager";

type DataContextState = {
    isLoading : boolean,
    Data : CarInfo[] ,
    Func: {
            GetData : () => void,
            PostData : (data : CarInfo,parentCustomerId : number) => void,
            PutData : (id : number, data:CarInfo) => void,
            DeleteData : (id : number) => void,
            GetChildComments : (carId : number) => Promise<CommentInfo[]>;
    }
}

export const CarDataContext = createContext<DataContextState>({} as DataContextState);
export const CarDataContextProvider : React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [state,dispatch] = useReducer(CarReducer,[]);

    useEffect(() => {
        getData();
    },[])

    // region Valueで渡すメソッド
    const getData = () => {
        setIsLoading(true)
        new CarApiDataManager().GetData().then(res => {
            dispatch(CarReadAllActionCreator(res))
            setIsLoading(false)
        }).catch(err => console.log(err));
    }

    const insertData = (data : CarInfo,parentCustomerId : number) => {
        new CarApiDataManager()
            .PostData(data,parentCustomerId)
            .then(res => dispatch(CarInsertActionCreator(res)))
            .catch(err => console.log(err));
    }
    const updateData = (id : number,data : CarInfo) => {
        new CarApiDataManager()
            .PutData(id,data)
            .then(res => dispatch(CarUpdateActionCreator(id,res)))
            .catch(err => console.log(err));
    }
    const deleteData = (id : number) => {
        new CarApiDataManager()
            .DeleteData(id)
            .then(res => dispatch(CarDeleteActionCreator(id)))
            .catch(err => console.log(err));
    }
    // endregion

    return (
        <CarDataContext.Provider value={{
            isLoading : isLoading,
            Data : state,
            Func : {
                GetData : getData,
                PostData : insertData,
                PutData : updateData,
                DeleteData : deleteData,
                GetChildComments: new CarApiDataManager().GetChildComment
            }
        }}>
            {children}
        </CarDataContext.Provider>
    )

}