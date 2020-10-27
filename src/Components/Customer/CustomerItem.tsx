import {makeStyles} from "@material-ui/core/styles";
import React, {FC, useContext, useEffect, useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import CommentCount from "../Common/CommentCount";
import LinkCard from "../Common/LinkCard";
import {PathList} from "../../Routing/path";
import {CarInfo, CustomerInfo} from "../../Context/DataTypeList";
import {DataContext} from "../../Context/DataContextProvider";
import DeleteUpdateButton from "../Common/DeleteUpdateButton";


type Props = {
    Customer : CustomerInfo,
    EditBtnAction : (cus : CustomerInfo) => void;
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
    }
}))


const CustomerItem : FC<Props> = ({Customer,EditBtnAction}) => {

    const classes = myStyle();

    return(
        <LinkCard path={`${PathList.customerDetail}/${Customer.id}`}>
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
                <DeleteUpdateButton editUrl={'test'} deleteUrl={'test'}/>
                <Button variant={'contained'} color={'primary'} onClick={() => EditBtnAction(Customer)}>編集</Button>
            </Grid>
        </LinkCard>
    )
};

export default CustomerItem