import React, {createContext, FC, useContext, useState} from 'react';

type TabContextState = {
    currentIndex : number,
    setCurrentIndex : (event : React.ChangeEvent<{}>,  newValue: number) => void
}

export const TabContext = createContext<TabContextState>({} as TabContextState);
const TabContextProvider : FC = ({children}) => {

    const [v,setV] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setV(newValue);
    };

    return (
        <TabContext.Provider value={{currentIndex : v,setCurrentIndex : handleChange}}>
            {children}
        </TabContext.Provider>
    );
};

export default TabContextProvider;