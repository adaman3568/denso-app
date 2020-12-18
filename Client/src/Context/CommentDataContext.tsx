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

type DataContextState = {
    isLoading : boolean,
    Data : CommentInfo[] ,
    Func: {
            GetData : () => void,
            PostData : (data : CommentInfo) => void,
            PutData : (id : number, data:CommentInfo) => void,
            DeleteData : (id : number) => void}
}

export const CommentDataContext = createContext<DataContextState>({} as DataContextState);
export const CommentDataContextProvider : React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [state,dispatch] = useReducer(CommentReducer,[]);

    useEffect(() => {
        getData();
    },[])

    // region Valueで渡すメソッド
    const getData = () => {
        setIsLoading(true)
        new CommentApiDataManager().GetData().then(res => {
            dispatch(CommentsReadActionCreator(res))
            setIsLoading(false)
        }).catch(err => console.log(err));
    }

    const insertData = (data : CommentInfo) => {
        new CommentApiDataManager()
            .PostData(data)
            .then(res => dispatch(CommentInsertActionCreator(res)))
            .catch(err => console.log(err));
    }
    const updateData = (id : number,data : CommentInfo) => {
        new CommentApiDataManager()
            .PutData(id,data)
            .then(res => dispatch(CommentUpdateActionCreator(id,res)))
            .catch(err => console.log(err));
    }
    const deleteData = (id : number) => {
        new CommentApiDataManager()
            .DeleteData(id)
            .then(res => dispatch(CommentDeleteActionCreator(id)))
            .catch(err => console.log(err));
    }
    // endregion

    return (
        <CommentDataContext.Provider value={{
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
        </CommentDataContext.Provider>
    )

}