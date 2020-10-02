import React, {createContext, FC, useReducer} from 'react';
import {rootInitial, rootReducer, RootReducerType} from "../Reducers/RootReducer";
import {CustomerInfo, EmployeeInfo} from "./DataTypeList";

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

    return (
        <DataContext.Provider value={{
            Customer : {
                Data : state.Customer,
                Func : {}
            },
            Employee : {
                Data : state.Emoloyee,
                Func : {}
            }
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;