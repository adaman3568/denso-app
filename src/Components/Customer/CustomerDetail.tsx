import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo, CustomerInfo} from "../../Context/DataTypeList";
import CarItem from "../Car/CarItem";

type pageProps = {} & RouteComponentProps<
    {
        id : string
    }>

const CustomerDetail : FC<pageProps> = ({match}) => {
    const {Customer,Car} = useContext(DataContext);
    const [customer , setCustomer] = useState<CustomerInfo>({} as CustomerInfo);
    const [cars , setCars] = useState<CarInfo[]>([]);
    useEffect(() => {
        const c = Customer.Data.find(item => item.id == match.params.id);
        if (c){
            setCustomer(c);
            Car.Func.GetCustomerCars(match.params.id).then(d => setCars(d))
        }
    },[]);

    return (
        <div>
            <h2>this is id:{match.params.id}'s customer detail page</h2>
            <p>{customer.id}</p>
            <p>{customer.Name}</p>
            {cars?.map((item,index) => <CarItem key={index} Car={item}/>)}
        </div>
    );
};

export default CustomerDetail;