import React from "react";
import {EmployeeInfo} from "../Context/DataTypeList";
export const EmpInitialState : EmployeeInfo[] = [];

export const EmpReadAllAction = 'eraa' as const;
export const EmpUpdateAction = 'eua' as const;
export const EmpInsertAction = 'eia' as const;
export const EmpDeleteAction = 'eda' as const;

export const EmpReadAllActionCreator = (data : EmployeeInfo[]) => ({
    type : EmpReadAllAction,
    payload : {data},
});
export const EmpUpdateActionCreator = (id : number,data : EmployeeInfo) => ({
    type : EmpUpdateAction,
    payload : {id,data},
});
export const EmpInsertActionCreator = (data : EmployeeInfo) => ({
    type : EmpInsertAction,
    payload : {data},
});
export const EmpDeleteActionCreator = (id : number) => ({
    type : EmpDeleteAction,
    payload : {id},
});


export type CustomerActions =
    ReturnType<typeof EmpReadAllActionCreator> |
    ReturnType<typeof EmpInsertActionCreator> |
    ReturnType<typeof EmpUpdateActionCreator> |
    ReturnType<typeof EmpDeleteActionCreator>

const EmployeeReducer : React.Reducer<EmployeeInfo[],CustomerActions> = (status = EmpInitialState , action) : EmployeeInfo[] => {
    switch (action.type) {
        case EmpReadAllAction:
            return action.payload.data;
        case EmpDeleteAction:
            return status.filter(item => item.id !== action.payload.id)
        case EmpInsertAction:
            return [action.payload.data,...status]
        case EmpUpdateAction:
            const filterdData = status.filter(item => item.id !== action.payload.id);
            return [action.payload.data,...filterdData]
        default:
            return status;
    }
};

export default EmployeeReducer;


