import React, {FC} from 'react';
import {CarInfo, CustomerInfo} from "../../../Context/DataTypeList";
import {Typography,Button,CardActions} from "@material-ui/core";
import {Link} from 'react-router-dom'
import {PathList} from "../../../Routing/path";
import {makeStyles} from "@material-ui/core/styles";
import LinkButton from "../../Common/LinkButton";

const useStyle = makeStyles((theme) => ({
    cardLink : {
        textDecoration : 'none',
        marginRight : theme.spacing(1)
    }
}));

type Props = {
    Customer : CustomerInfo,
    Car : CarInfo
}

const CustomerAndCar : FC<Props> = ({Customer,Car}) => {
    const classes = useStyle();
    return (
        <div>
            <LinkButton path={`${PathList.customerDetail}/${Customer.id}`} value={Customer.Name}/>
            <LinkButton path={`${PathList.carDetail}/${Car.id}`} value={Car.Name}/>
        </div>
    );
};

export default CustomerAndCar;