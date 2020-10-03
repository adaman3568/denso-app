import {CustomerInfo} from "../Context/DataTypeList";
import React from "react";
export const CustomerInitialState : CustomerInfo[] = [];

export const ReadAllCustomerAction = 'ReadAllCustomer' as const;

const ReadAllCustomer = () => ({
    type : ReadAllCustomerAction
    });

export type CustomerActions = ReturnType<typeof ReadAllCustomer>

const CustomerReducer : React.Reducer<CustomerInfo[],CustomerActions> = (status = CustomerInitialState , action) : CustomerInfo[] => {
    switch (action.type) {
        case ReadAllCustomerAction:
            return status;
        default:
            return status;
    }
};

export default CustomerReducer;


