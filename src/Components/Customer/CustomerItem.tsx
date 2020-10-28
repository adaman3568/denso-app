import {makeStyles} from "@material-ui/core/styles";
import React, {FC, useContext, useEffect, useState} from "react";
import {Button, ButtonGroup, Card, CardActions, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import LinkCardContent from "../Common/LinkCardContent";
import {PathList} from "../../Routing/path";
import {CarInfo, CustomerInfo} from "../../Context/DataTypeList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalWindow from "../Common/ModalWindow";
import AddCustomer from "./AddCustomer";
import DeleteUpdateButton from "../Common/DeleteUpdateButton";


type Props = {
    Customer : CustomerInfo,
    EditEvent : (cus : CustomerInfo) => void;
}

const myStyle = makeStyles((theme) => ({
    companyName : {
        padding : theme.spacing(2)
    },
    companyAddress : {
        padding : theme.spacing(2)
    },
    cardInfo : {
        display : 'flex',
        justifyContent : 'left'
    },
    commentCount : {
        marginLeft : theme.spacing(1)
    },
    card : {
        padding : theme.spacing(2),
        margin : theme.spacing(3)
    },
    cardContent : {
        backgroundColor : 'gray'
    }
}));

const CustomerItem : FC<Props> = ({Customer,EditEvent}) => {

    const classes = myStyle();
    return(
        <Card className={classes.card}>
            <LinkCardContent path={`${PathList.customerDetail}/${Customer.id}`}>
                <Grid container>
                    <Grid sm={12}>
                        <CardTitle>
                            {Customer.Name}
                        </CardTitle>
                    </Grid>
                    <Grid sm={12}>
                        <Typography variant={"h5"} className={classes.companyAddress}>
                            {Customer.Address}
                        </Typography>
                    </Grid>
                </Grid>
            </LinkCardContent>
            <CardActions>
                <DeleteUpdateButton EditAction={() => {EditEvent(Customer)}}/>
            </CardActions>
        </Card>
    )
};

export default CustomerItem