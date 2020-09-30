import React, {createContext, FC, useReducer} from 'react';
import {GetAllCarData,GetCarData} from './Functions/CarFunction'
import {GetAllEmpData,GetEmpData} from "./Functions/EmpFunction";
import {GetAllCustomerData,GetCustomerData} from './Functions/CustomerFunction'
import {rootInitial, rootReducer, RootReducerType} from "../Reducers/RootReducer";

export const DataContext = createContext<IDataContextState>({} as IDataContextState);

interface IDataContextState {
    CarFunc : {
        GetAllCarData : typeof GetAllCarData
        GetCarData : typeof GetCarData
    },
    EmpFunc : {
        GetAllEmpData : typeof GetAllEmpData,
        GetEmpData : typeof GetEmpData
    },
    CustomerFunc : {
        GetAllCustomerData : typeof GetAllCustomerData,
        GetCustomerData : typeof GetCustomerData
    }
}

const [state , dispatch] = useReducer<RootReducerType>(
    rootReducer,
    rootInitial
);

const DataContextProvider : FC = ({children}) => {
    console.log(state);
    console.log(dispatch);

    return (
        <DataContext.Provider value={{
            CarFunc : {
                GetAllCarData,GetCarData},
            EmpFunc : {
                GetAllEmpData,GetEmpData},
            CustomerFunc : {
                GetAllCustomerData,GetCustomerData}
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;