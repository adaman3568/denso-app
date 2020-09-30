import combineReducers from "react-combine-reducers";
import {CustomerInfo, EmployeeInfo} from "../Context/DataTypeList";
import CustomerReducer, {CustomerActions} from "./CustomerReducer";
import EmpReducer, {EmployeeActions} from "./EmpReducer";

type RootState = {
    Customer : CustomerInfo[],
    Emoloyee : EmployeeInfo[]
}

type RootAction = {
    Customer : CustomerActions,
    Employee : EmployeeActions
}

export type RootReducerType = (state : RootState,action : RootAction) => RootState;

const [rootReducer , rootInitial] = combineReducers<RootReducerType>({
    Customer : [CustomerReducer,[]],
    Emoloyee : [EmpReducer,[]]
});

export {rootReducer,rootInitial};