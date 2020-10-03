import combineReducers from "react-combine-reducers";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "../Context/DataTypeList";
import CustomerReducer, {CustomerActions} from "./CustomerReducer";
import EmpReducer, {EmployeeActions} from "./EmpReducer";
import CommentReducer, {CommentActions} from "./CommentReducer";
import CarReducer, {CarActions} from "./CarReducer";

type RootState = {
    Customer : CustomerInfo[],
    Employee : EmployeeInfo[],
    Comment : CommentInfo[],
    Car : CarInfo[]
}

type RootAction = CustomerActions | EmployeeActions | CommentActions | CarActions;

export type RootReducerType = (state : RootState,action : RootAction) => RootState;

const [rootReducer , rootInitial] = combineReducers<RootReducerType>({
    Customer : [CustomerReducer,[]],
    Employee : [EmpReducer,[]],
    Comment : [CommentReducer,[]],
    Car : [CarReducer,[]]
});

export {rootReducer,rootInitial};