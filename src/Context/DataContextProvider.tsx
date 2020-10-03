import React, {createContext, FC, useEffect, useReducer} from 'react';
import {rootInitial, rootReducer, RootReducerType} from "../Reducers/RootReducer";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import {GetAllEmp} from "./Functions/EmpFunction";
import EmployeeDetail from "../Components/Employee/EmployeeDetail";
import {SetAllEmp} from "../Reducers/EmpReducer";
import {GetAllComment} from "./Functions/CommentFunction";
import {SetAllComment} from "../Reducers/CommentReducer";
import {GetAllCar} from "./Functions/CarFunction";
import {SetAllCar} from "../Reducers/CarReducer";

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
        Func : {}
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
        GetAllComment().then(d => dispatch(SetAllComment(d)));
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
                Func : {}
            }
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;