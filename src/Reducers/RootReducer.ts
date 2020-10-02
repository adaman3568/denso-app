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

const CustomerInitialState : CustomerInfo[] = [
    {id : 1,customerName : "合同会社Rst.com",CarCount : 1,CommentCount : 2,LastCommentDate : '2020/09/21 12:45:22' ,Address : "東京都世田谷区1-2-3", Cars :
            [
                {id : 1,CarName : '11-22',Detail : 'etc装着済み',CommentCount : 12 , LastCommentDate : '2020/12/11 12:34:23'},
                {id : 1,CarName : '12-45',Detail : 'etc装着済み＆デジタコ',CommentCount : 10 , LastCommentDate : '2020/12/10 10:45:11'}
            ]},
    {id : 2,customerName : "株式会社タイガー",CarCount : 5,CommentCount : 102,LastCommentDate : '2020/09/22 22:23:45',Address : "東京都世田谷区1-2-3" , Cars:
            [
                {id : 1,CarName : '11-22',Detail : 'etc装着済み',CommentCount : 12 , LastCommentDate : '2020/12/11 12:34:23'},
                {id : 1,CarName : '12-45',Detail : 'etc装着済み＆デジタコ',CommentCount : 10 , LastCommentDate : '2020/12/10 10:45:11'}
            ]}
];

const EmployeeInitialState : EmployeeInfo[] = [
    {id : 1, EmpName : '林山　浩',eMail : 'h.hayashiyama@co-rst.com', CommentCount : 10, LastCommentDate : '2020/12/10 10:10:23'},
    {id : 2, EmpName : '池田　しんのすけ',eMail : 's.ikeda@co-rst.com', CommentCount : 12, LastCommentDate : '2020/12/8 09:08:20'},
    {id : 3, EmpName : '浅田　和則',eMail : 'k.asada@co-rst.com', CommentCount : 1400, LastCommentDate : '2020/12/11 19:22:24'}
];

export type RootReducerType = (state : RootState,action : RootAction) => RootState;

const [rootReducer , rootInitial] = combineReducers<RootReducerType>({
    Customer : [CustomerReducer,CustomerInitialState],
    Emoloyee : [EmpReducer,EmployeeInitialState]
});

export {rootReducer,rootInitial};