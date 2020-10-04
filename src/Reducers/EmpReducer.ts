import {EmployeeInfo} from "../Context/DataTypeList";
import React from "react";

const EmpInitialState : EmployeeInfo[] = [];

const SetAllEmployeeAction = 'SetAllEmployeeAction' as const;

export const SetDisplayEmp = (data : EmployeeInfo[]) => ({
    type : SetAllEmployeeAction,
    payload : data,
    });

export type EmployeeActions = ReturnType<typeof SetDisplayEmp>

const EmpReducer : React.Reducer<EmployeeInfo[],EmployeeActions> = (status = EmpInitialState , action) : EmployeeInfo[] => {
    switch (action.type) {
        case SetAllEmployeeAction:
            return action.payload;
        default:
            return status;
    }
};

export default EmpReducer;