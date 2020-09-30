import {CustomerInfo} from "../Context/DataTypeList";
import React from "react";
export const CustomerInitialState : CustomerInfo[] = [];

const ReadAllCustomer = () => ({
    type : 'ReadAllCustomer'
    });

export type CustomerActions = ReturnType<typeof ReadAllCustomer>

const CustomerReducer : React.Reducer<CustomerInfo[],CustomerActions> = (status = CustomerInitialState , action) : CustomerInfo[] => {
    switch (action.type) {
        case 'ReadAllCustomer':
            return status;
        default:
            return status;
    }
};

export default CustomerReducer;


