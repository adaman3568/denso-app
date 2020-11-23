import React, {FC} from 'react';
import {CarInfo, CustomerInfo} from "../../../Context/DataTypeList";
import {PathList} from "../../../Routing/path";
import LinkButton from "../../Common/LinkButton";

type Props = {
    CustomerName : string
    CustomerId : number
    CarName : string,
    CarId:number
}

const CustomerAndCar : FC<Props> = ({CustomerId,CustomerName, CarId,CarName}) => {
    return (
        <div>
            <LinkButton path={`${PathList.customerDetail}/${CustomerId}`} value={CustomerName}/>
            <LinkButton path={`${PathList.carDetail}/${CarId}`} value={CarName}/>
        </div>
    );
};

export default CustomerAndCar;