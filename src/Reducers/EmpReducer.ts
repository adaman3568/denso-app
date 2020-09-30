import {EmployeeInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : EmployeeInfo[] = [];

const ReadAllEmp = () => ({
    type : 'ReadAllEmp'
});

export type EmployeeActions = ReturnType<typeof ReadAllEmp>

const EmpReducer : React.Reducer<EmployeeInfo[],EmployeeActions> = (status = EmpInitialState , action) : EmployeeInfo[] => {
    switch (action.type) {
        case 'ReadAllEmp':
            return status;
        default:
            return status;
    }
};

export default EmpReducer;