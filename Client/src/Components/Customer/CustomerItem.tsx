import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Card, CardActions, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import LinkCardContent from "../Common/LinkCardContent";
import {PathList} from "../../Routing/path";
import DeleteUpdateButton from "../Common/DeleteUpdateButton";
import {CustomerInfo} from "../../Context/DataTypeList";
import {DataItemProps} from "../../PropsList";

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
    }
}));

const CustomerItem : FC<DataItemProps<CustomerInfo>> = ({Data, DeleteModalOpen,EditModalOpen}) => {

    const classes = myStyle();
    return(
        <Card className={classes.card}>
            <LinkCardContent path={`${PathList.customerDetail}/${Data.id}`}>
                <Grid container>
                    <Grid sm={12}>
                        <CardTitle>
                            {Data.name}
                        </CardTitle>
                    </Grid>
                    <Grid sm={12}>
                        <Typography variant={"h5"} className={classes.companyAddress}>
                            {Data.address}
                        </Typography>
                    </Grid>
                </Grid>
            </LinkCardContent>
            <CardActions>
                <DeleteUpdateButton EditAction={() => {EditModalOpen(Data)}} DeleteAction={() => {DeleteModalOpen(Data)}}/>
            </CardActions>
        </Card>
    )
};

export default CustomerItem