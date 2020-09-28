import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";

type Props = {
    Customer : CustomerInfo
}

const myStyle = makeStyles((theme) => ({
    card : {
        margin : theme.spacing(3),
        padding : theme.spacing(2)
    },
    companyName : {
        padding : theme.spacing(2)
    },
    companyAddress : {
        padding : theme.spacing(2)
    }
}))


const CustomerItem : FC<Props> = ({Customer}) => {

    const classes = myStyle();

    return(
        <Card className={classes.card}>
            <Grid container>
                <Grid sm={12}>
                    <CardTitle>
                        {Customer.customerName}
                    </CardTitle>
                </Grid>
                <Grid sm={12}>
                    <Typography variant={"h5"} className={classes.companyAddress}>
                        {Customer.Address}
                    </Typography>
                </Grid>
                <Grid sm={6}>
                    車両台数：{Customer.CarCount}<br/>
                    コメント件数：{Customer.CommentCount}
                </Grid>
                <Grid sm={6}>
                    最終コメント日付：{Customer.LastCommentDate}
                </Grid>
            </Grid>
        </Card>
    )
};

export default CustomerItem