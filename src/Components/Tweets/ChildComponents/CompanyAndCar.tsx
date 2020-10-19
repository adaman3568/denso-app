import React, {FC} from 'react';
import {CarInfo, CustomerInfo} from "../../../Context/DataTypeList";
import {Typography,Button,CardActions} from "@material-ui/core";
import {Link} from 'react-router-dom'
import {PathList} from "../../../Routing/path";
import {makeStyles} from "@material-ui/core/styles";

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
                <Link to={`${PathList.customerDetail}/${Customer.id}`} className={classes.cardLink}>
                    <Button size={'small'} color={"primary"} variant="contained" >顧客名 : {Customer.Name}</Button>
                </Link>
                <Link to={`${PathList.carDetail}/${Car.id}`} className={classes.cardLink}>
                    <Button  size={'small'} color={"primary"} variant="contained" >車両名 : {Car.Name}</Button>
                </Link>
        </div>
    );
};

export default CustomerAndCar;