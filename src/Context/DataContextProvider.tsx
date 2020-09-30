import React, {createContext, FC} from 'react';
import {GetAllCarData,GetCarData} from './Functions/CarFunction'
import {GetAllEmpData,GetEmpData} from "./Functions/EmpFunction";
import {GetAllCustomerData,GetCustomerData} from './Functions/CustomerFunction'

export const DataContext = createContext<IDataContextState>({} as IDataContextState)

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

const DataContextProvider : FC = ({children}) => {

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