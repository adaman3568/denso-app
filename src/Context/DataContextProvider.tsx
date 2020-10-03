import React, {createContext, FC, useEffect, useReducer} from 'react';
import {rootInitial, rootReducer, RootReducerType} from "../Reducers/RootReducer";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import {GetAllEmp} from "./Functions/EmpFunction";
import {SetAllEmp} from "../Reducers/EmpReducer";
import {GetAllComment,SetEmpComment} from "./Functions/CommentFunction";
import {SetAllComment} from "../Reducers/CommentReducer";
import {GetAllCar} from "./Functions/CarFunction";
import {SetAllCar} from "../Reducers/CarReducer";
import {GetAllCustomer} from "./Functions/CustomerFunction";
import {SetAllCustomer} from "../Reducers/CustomerReducer";

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
    }
}

const DataContextProvider : FC = ({children}) => {

    const [state , dispatch] = useReducer<RootReducerType>(
        rootReducer,
        rootInitial
    );

    useEffect(() => {
        GetAllComment().then(d => dispatch(SetAllComment(d)));
        GetAllEmp().then(d => dispatch(SetAllEmp(d)));
        GetAllCar().then(d => dispatch(SetAllCar(d)));
        GetAllCustomer().then(d => dispatch(SetAllCustomer(d)))
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
            }
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;