import React, {createContext, FC} from 'react';
import {GetAllCarData,GetCarData} from './Functions/CarFunction'

export const DataContext = createContext<IDataContextState>({} as IDataContextState)

interface IDataContextState {
    CarFunc : {
        GetAllCarData : typeof GetAllCarData
        GetCarData : typeof GetCarData
    }
}

const DataContextProvider : FC = ({children}) => {

    return (
        <DataContext.Provider value={{
            CarFunc : {
                GetAllCarData,
                GetCarData
            }}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;