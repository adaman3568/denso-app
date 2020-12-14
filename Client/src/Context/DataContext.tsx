import {ComponentProps, createContext, FC, useEffect, useState} from "react";
import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "./DataTypeList";
import React from 'react'
import {CommentApiDataManager} from "./ApiFunctions/CommentApiDataManager";
import {EmpApiDataManager} from "./ApiFunctions/EmpApiDataManager";
import {CarApiDataManager} from "./ApiFunctions/CarApiDataManager";
import {CustomerApiDataManager} from "./ApiFunctions/CustomerApiDataManager";

type DataContextState = {
    isLoading : boolean,
    dataInit : () => void
    Car : {Data : CarInfo[] ,
            Func: {
                GetData : () => Promise<CarInfo[]>,
                PostData : (data : CarInfo,parentCustomerId : number) => Promise<CarInfo>,
                PutData : (id : number, data:CarInfo) => Promise<CarInfo>,
                DeleteData : (id : number) => Promise<void>}}
    Emp : {Data : EmployeeInfo[] ,
            Func: {
                GetData : () => Promise<EmployeeInfo[]>,
                PostData : (data : EmployeeInfo) => Promise<EmployeeInfo>,
                PutData : (id : number, data:EmployeeInfo) => Promise<EmployeeInfo>,
                DeleteData : (id : number) => Promise<void>}}
    Customer : {Data : CustomerInfo[] ,
            Func: {
                GetData : () => Promise<CustomerInfo[]>,
                PostData : (data : CustomerInfo) => Promise<CustomerInfo>,
                PutData : (id : number, data:CustomerInfo) => Promise<CustomerInfo>,
                DeleteData : (id : number) => Promise<void>}}
    Comments : {Data : CommentInfo[] ,
            Func: {
                GetData : () => Promise<CommentInfo[]>,
                PostData : (data : CommentInfo) => Promise<CommentInfo>,
                PutData : (id : number, data:CommentInfo) => Promise<CommentInfo>,
                DeleteData : (id : number) => Promise<void>}}
}

export const DataContext = createContext<DataContextState>({} as DataContextState)

interface IState {
    isLoading : boolean;
    Car : CarInfo[];
    Customer : CustomerInfo[];
    Employee : EmployeeInfo[];
    Comment : CommentInfo[];
}

class DataContextProvider extends React.Component<ComponentProps<any>,IState>{

    private carDataManager : CarApiDataManager;
    private customerDataManager : CustomerApiDataManager;
    private employeeDataManager : EmpApiDataManager;
    private commentDataManager : CommentApiDataManager;

    constructor(props : ComponentProps<any>) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {Car : [],Customer : [],Employee : [],Comment : [],isLoading : false};
        this.carDataManager = new CarApiDataManager();
        this.customerDataManager = new CustomerApiDataManager();
        this.employeeDataManager = new EmpApiDataManager();
        this.commentDataManager = new CommentApiDataManager();
    }

    componentDidMount = (): void => {
        this.dataInit();
    }

    dataInit = () => {
        this.carDataManager.GetData().then(res => this.setState({...this.state,Car : res}))
        this.customerDataManager.GetData().then(res => this.setState({...this.state,Customer : res}))
        this.employeeDataManager.GetData().then(res => this.setState({...this.state,Employee : res}))
        this.commentDataManager.GetData().then(res => this.setState({...this.state,Comment : res}));
    }

    render = () => {
        return(
            <DataContext.Provider value={{
                Car :
                    {Data : this.state.Car, Func : {
                            GetData : this.carDataManager.GetData,
                            PostData : this.carDataManager.PostData,
                            PutData : this.carDataManager.PutData,
                            DeleteData : this.carDataManager.DeleteData}},
                Emp :
                    {Data : this.state.Employee , Func : {
                            GetData : this.employeeDataManager.GetData,
                            PostData : this.employeeDataManager.PostData,
                            PutData : this.employeeDataManager.PutData,
                            DeleteData : this.employeeDataManager.DeleteData}},
                Customer :
                    {Data : this.state.Customer,Func : {
                            GetData : this.customerDataManager.GetData,
                            PostData : this.customerDataManager.PostData,
                            PutData : this.customerDataManager.PutData,
                            DeleteData : this.customerDataManager.DeleteData}},
                Comments :
                    {Data : this.state.Comment,Func : {
                            GetData : this.commentDataManager.GetData,
                            PostData : this.commentDataManager.PostData,
                            PutData : this.commentDataManager.PutData,
                            DeleteData : this.commentDataManager.DeleteData}},
                isLoading : this.state.isLoading,
                dataInit : this.dataInit
            }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default DataContextProvider