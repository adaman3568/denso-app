import React, {FC} from 'react';
import {CarInfo, CustomerInfo} from "../../../Context/DataTypeList";
import {PathList} from "../../../Routing/path";
import LinkButton from "../../Common/LinkButton";

type Props = {
    Customer : CustomerInfo,
    Car : CarInfo
}

const CustomerAndCar : FC<Props> = ({Customer,Car}) => {
    return (
        <div>
            <LinkButton path={`${PathList.customerDetail}/${Customer.id}`} value={Customer.name}/>
            <LinkButton path={`${PathList.carDetail}/${Car.id}`} value={Car.carNo}/>
        </div>
    );
};

export default CustomerAndCar;