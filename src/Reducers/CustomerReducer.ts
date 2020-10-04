import {CommentInfo, CustomerInfo} from "../Context/DataTypeList";
import React from "react";
export const CustomerInitialState : CustomerInfo[] = [];

export const SetAllCustomerAction = 'SetAllCustomerAction' as const;

export const SetDisplayCustomer = (data : CustomerInfo[]) => ({
    type : SetAllCustomerAction,
    payload : data,
});

export type CustomerActions = ReturnType<typeof SetDisplayCustomer>

const CustomerReducer : React.Reducer<CustomerInfo[],CustomerActions> = (status = CustomerInitialState , action) : CustomerInfo[] => {
    switch (action.type) {
        case SetAllCustomerAction:
            return action.payload;
        default:
            return status;
    }
};

export default CustomerReducer;


