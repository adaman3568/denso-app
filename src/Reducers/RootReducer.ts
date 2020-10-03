import combineReducers from "react-combine-reducers";
import {CustomerInfo, EmployeeInfo} from "../Context/DataTypeList";
import CustomerReducer, {CustomerActions} from "./CustomerReducer";
import EmpReducer, {EmployeeActions} from "./EmpReducer";

type RootState = {
    Customer : CustomerInfo[],
    Employee : EmployeeInfo[]
}

type RootAction = CustomerActions | EmployeeActions;

export type RootReducerType = (state : RootState,action : RootAction) => RootState;

const [rootReducer , rootInitial] = combineReducers<RootReducerType>({
    Customer : [CustomerReducer,[]],
    Employee : [EmpReducer,[]]
});

export {rootReducer,rootInitial};