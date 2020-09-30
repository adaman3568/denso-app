import React, {createContext, FC} from 'react';
export const DataContext = createContext<IDataContextState>({} as IDataContextState)

interface IDataContextState {
    functions : {
        GetAllCarData : typeof GetAllCarData
        GetCarData : typeof GetCarData

    }
}

export type CarInfo = {
    id : number,
    CarName : string,
    Detail : string,
    CommentCount : number,
    LastCommentDate : string
}

const CarMockItems : CarInfo[] = [
    {id : 1,CarName : '11-22',Detail : 'etc装着済み',CommentCount : 12 , LastCommentDate : '2020/12/11 12:34:23'},
    {id : 1,CarName : '12-45',Detail : 'etc装着済み＆デジタコ',CommentCount : 10 , LastCommentDate : '2020/12/10 10:45:11'}
];

const GetAllCarData = () : CarInfo[] => {
    return CarMockItems;
};


const GetCarData = (id : number) => {
    return CarMockItems.find(item => item.id === id);
};

const DataContextProvider : FC = ({children}) => {

    return (
        <DataContext.Provider value={{
            functions : {
                GetAllCarData,
                GetCarData
            }}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;