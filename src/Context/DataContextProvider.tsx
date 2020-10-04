import React, {createContext, FC, useEffect, useReducer} from 'react';
import {rootInitial, rootReducer, RootReducerType,RootAction} from "../Reducers/RootReducer";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import {GetAllEmp} from "./Functions/EmpFunction";
import {SetDisplayEmp} from "../Reducers/EmpReducer";
import {GetAllComment,SetEmpComment} from "./Functions/CommentFunction";
import {SetDisplayComment} from "../Reducers/CommentReducer";
import {GetAllCar} from "./Functions/CarFunction";
import {SetDisplayCar} from "../Reducers/CarReducer";
import {GetAllCustomer} from "./Functions/CustomerFunction";
import {SetDisplayCustomer} from "../Reducers/CustomerReducer";

export const DataContext = createContext<IDataContextState>({} as IDataContextState);

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
        Func : {}
    },
    Comment : {
        Data : CommentInfo[],
        Func : {
            SetEmpComment : typeof SetEmpComment
        }
    },
    dispatch : (action : RootAction) => void
}

const DataContextProvider : FC = ({children}) => {

    const [state , dispatch] = useReducer<RootReducerType>(
        rootReducer,
        rootInitial
    );

    useEffect(() => {
        GetAllComment().then(d => dispatch(SetDisplayComment(d)));
        GetAllEmp().then(d => dispatch(SetDisplayEmp(d)));
        GetAllCar().then(d => dispatch(SetDisplayCar(d)));
        GetAllCustomer().then(d => dispatch(SetDisplayCustomer(d)))
    },[]);

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
                Func : {}
            },
            Comment : {
                Data : state.Comment,
                Func : {SetEmpComment}
            },
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;