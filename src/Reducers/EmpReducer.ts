import {EmployeeInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : EmployeeInfo[] = [];

const SetAllEmployeeAction = 'SetAllEmployeeAction' as const;

export const SetAllEmp = (data : EmployeeInfo[]) => ({
    type : SetAllEmployeeAction,
    payload : data,
    });

export type EmployeeActions = ReturnType<typeof SetAllEmp>

const EmpReducer : React.Reducer<EmployeeInfo[],EmployeeActions> = (status = EmpInitialState , action) : EmployeeInfo[] => {
    switch (action.type) {
        case SetAllEmployeeAction:
            return action.payload;
        default:
            return status;
    }
};

export default EmpReducer;