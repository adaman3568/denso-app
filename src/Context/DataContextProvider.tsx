import React, {createContext, FC, useEffect, useReducer, useState} from 'react';
import {rootInitial, rootReducer, RootReducerType,RootAction} from "../Reducers/RootReducer";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";

// region Import Employee's
import {GetAllEmployeesFromDB} from "./Functions/EmpFunction";
import {SetDisplayEmpActionCreator} from "../Reducers/EmpReducer";
// endregion

// region Import Comment's
import {GetAllCommentsFromDB,GetEmpCommentsFromDb,GetCarCommentsFromDB,GetCustomerCommentsFromDB} from "./Functions/CommentFunction";
import {SetDisplayCommentActionCreator} from "../Reducers/CommentReducer";
// endregion

// region Import Car's
import {
    GetAllCarFromDB,
    GetCustomerCarsFromDB,
    CreateCarIntoDB,
    DeleteCarFromDB,
    UpdateCarFromDB
} from "./Functions/CarFunction";
import {CarDeleteActionCreator, CarUpdateActionCreator, SetDisplayCarActionCreator} from "../Reducers/CarReducer";
// endregion

// region Import Customer's
import {GetAllCustomersFromDB} from "./Functions/CustomerFunction";
import {SetDisplayCustomerActionCreator} from "../Reducers/CustomerReducer";
// endregion

export const DataContext = createContext<IDataContextState>({} as IDataContextState);

// DataContextのvalueのインターフェース
// DataContextに関数を追加したり、値を保持させたりする際はここを触る。
interface IDataContextState {
    Customer : {
        Data : CustomerInfo[],
        Func : {}
    },
    Employee : {
        Data : EmployeeInfo[],
        Func : {}
    },
    Car : {
        Data : CarInfo[],
        Func : {
            GetCustomerCars : typeof GetCustomerCarsFromDB
            CreateCar : typeof CreateCarIntoDB
            DeleteCar : DeleteCarType,
            UpdateCar : UpdateCarType
        }
    },
    Comment : {
        Data : CommentInfo[],
        Func : {
            GetEmpComments : typeof GetEmpCommentsFromDb,
            GetCarComments : typeof GetCarCommentsFromDB,
            GetCustomerCommentsFromDB : typeof GetCustomerCommentsFromDB,
        }
    },
    loading : boolean,
    dispatch : (action : RootAction) => void
}

// region CarMethodType
type DeleteCarType = (id : string) => void
type UpdateCarType = (id : string,name : string,detail : string) => void
// endregion

// DataContextの本体
const DataContextProvider : FC = ({children}) => {

    const [loading,setLoading] = useState<boolean>(true);

    const [state , dispatch] = useReducer<RootReducerType>(
        rootReducer,
        rootInitial
    );

    useEffect(() => {
        setLoading(true)
        GetAllCommentsFromDB().then(d => dispatch(SetDisplayCommentActionCreator(d)));
        GetAllEmployeesFromDB().then(d => dispatch(SetDisplayEmpActionCreator(d)));
        GetAllCarFromDB().then(d => dispatch(SetDisplayCarActionCreator(d)));
        GetAllCustomersFromDB().then(d => {
            dispatch(SetDisplayCustomerActionCreator(d))
            setLoading(false)
        })
    },[]);

    // region CarMethod
    const DeleteCar : DeleteCarType = async (id : string) => {
        dispatch(CarDeleteActionCreator(id));
        await DeleteCarFromDB(id);
    };

    const UpdateCar : UpdateCarType = async (id : string,name : string,detail : string) => {
        const newCarData = await UpdateCarFromDB(id,name,detail);
        dispatch(CarUpdateActionCreator(id,newCarData))
    };
    // endregion

        return (
        <DataContext.Provider value={{
            Customer : {
                Data : state.Customer,
                Func : {}
            },
            Employee : {
                Data : state.Employee,
                Func : {}
            },
            Car : {
                Data : state.Car,
                Func : {
                    GetCustomerCars : GetCustomerCarsFromDB,
                    CreateCar : CreateCarIntoDB,
                    DeleteCar,UpdateCar}
            },
            Comment : {
                Data : state.Comment,
                Func : {
                    GetEmpComments : GetEmpCommentsFromDb,
                    GetCarComments : GetCarCommentsFromDB,
                    GetCustomerCommentsFromDB}
            },
            loading,
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;