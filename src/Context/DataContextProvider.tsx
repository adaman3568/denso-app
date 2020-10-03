import React, {createContext, FC, useEffect, useReducer} from 'react';
import {rootInitial, rootReducer, RootReducerType} from "../Reducers/RootReducer";
import {CustomerInfo, EmployeeInfo} from "./DataTypeList";
import {GetAllEmp} from "./Functions/EmpFunction";
import EmployeeDetail from "../Components/Employee/EmployeeDetail";
import {SetAllEmp} from "../Reducers/EmpReducer";

export const DataContext = createContext<IDataContextState>({} as IDataContextState);

interface IDataContextState {
    Customer : {
        Data : CustomerInfo[],
        Func : {}
    },
    Employee : {
        Data : EmployeeInfo[],
        Func : {}
    }
}

const DataContextProvider : FC = ({children}) => {

    const [state , dispatch] = useReducer<RootReducerType>(
        rootReducer,
        rootInitial
    );

    useEffect(() => {
        GetAllEmp().then(data => dispatch(SetAllEmp(data)));
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
            }
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;