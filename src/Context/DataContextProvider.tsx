import React, {createContext, FC, useEffect, useReducer} from 'react';
import {rootInitial, rootReducer, RootReducerType,RootAction} from "../Reducers/RootReducer";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import {GetAllEmployees} from "./Functions/EmpFunction";
import {SetDisplayEmp} from "../Reducers/EmpReducer";
import {GetAllComments,GetEmpComments,GetCarComments} from "./Functions/CommentFunction";
import {SetDisplayComment} from "../Reducers/CommentReducer";
import {GetAllCar,GetCustomerCars,CreateCar} from "./Functions/CarFunction";
import {CarDeleteActionCreator, SetDisplayCar} from "../Reducers/CarReducer";
import {GetAllCustomers} from "./Functions/CustomerFunction";
import {SetDisplayCustomer} from "../Reducers/CustomerReducer";
import firebase, {DocumentList} from '../Firebase'

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
        Func : {
            GetCustomerCars : typeof GetCustomerCars
            CreateCar : typeof CreateCar
            DeleteCar : (id : string) => void
        }
    },
    Comment : {
        Data : CommentInfo[],
        Func : {
            GetEmpComments : typeof GetEmpComments,
            GetCarComments : typeof GetCarComments
        }
    },
    dispatch : (action : RootAction) => void
}

// region CarMethodType
type DeleteCarType = (id : string) => void
// endregion

const DataContextProvider : FC = ({children}) => {

    const [state , dispatch] = useReducer<RootReducerType>(
        rootReducer,
        rootInitial
    );

    useEffect(() => {
        GetAllComments().then(d => dispatch(SetDisplayComment(d)));
        GetAllEmployees().then(d => dispatch(SetDisplayEmp(d)));
        GetAllCar().then(d => dispatch(SetDisplayCar(d)));
        GetAllCustomers().then(d => dispatch(SetDisplayCustomer(d)))
    },[]);

    // region CarMethod
    const DeleteCar : DeleteCarType = async (id : string) => {
        dispatch(CarDeleteActionCreator(id))
        const db = firebase.firestore()
        await db.collection(DocumentList.Cars).doc(id).delete()
    };
    // endregion

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
                Func : {GetCustomerCars,CreateCar,DeleteCar}
            },
            Comment : {
                Data : state.Comment,
                Func : {
                    GetEmpComments,
                    GetCarComments}
            },
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;