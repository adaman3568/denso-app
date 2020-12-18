import {CustomerInfo} from "../Context/DataTypeList";
import React from "react";
export const CustomerInitialState : CustomerInfo[] = [];

export const CustomerReadAllAction = 'craa' as const;
export const CustomerUpdateAction = 'cua' as const;
export const CustomerInsertAction = 'cia' as const;
export const CustomerDeleteAction = 'cda' as const;

export const CustomerReadAllActionCreator = (data : CustomerInfo[]) => ({
    type : CustomerReadAllAction,
    payload : {data},
});
export const CustomerUpdateActionCreator = (id : number,data : CustomerInfo) => ({
    type : CustomerUpdateAction,
    payload : {id,data},
});
export const CustomerInsertActionCreator = (data : CustomerInfo) => ({
    type : CustomerInsertAction,
    payload : {data},
});
export const CustomerDeleteActionCreator = (id : number) => ({
    type : CustomerDeleteAction,
    payload : {id},
});


export type CustomerActions =
    ReturnType<typeof CustomerReadAllActionCreator> |
    ReturnType<typeof CustomerInsertActionCreator> |
    ReturnType<typeof CustomerUpdateActionCreator> |
    ReturnType<typeof CustomerDeleteActionCreator>

const CustomerReducer : React.Reducer<CustomerInfo[],CustomerActions> = (status = CustomerInitialState , action) : CustomerInfo[] => {
    switch (action.type) {
        case CustomerReadAllAction:
            return action.payload.data;
        case CustomerDeleteAction:
            return status.filter(item => item.id !== action.payload.id)
        case CustomerInsertAction:
            return [action.payload.data,...status]
        case CustomerUpdateAction:
            const filterdData = status.filter(item => item.id !== action.payload.id);
            return [action.payload.data,...filterdData]
        default:
            return status;
    }
};

export default CustomerReducer;


