import React, {FC} from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardTitle from "../Common/CardTitle";

type CustomerInfo = {
    id : number
    customerName : string
    CarCount : number
    CommentCount : number
    LastCommentDate : string
    Address : string
}

const CustomerInfoList : CustomerInfo[] = [
    {id : 1,customerName : "合同会社Rst.com",CarCount : 1,CommentCount : 2,LastCommentDate : '2020/09/21 12:45:22' ,Address : "東京都世田谷区1-2-3"},
    {id : 2,customerName : "株式会社タイガー",CarCount : 5,CommentCount : 102,LastCommentDate : '2020/09/22 22:23:45',Address : "東京都世田谷区1-2-3"}
]

const CustomerIndex : FC = () => {
    return (
        <div>
            <h2>this is CustomerIndex page.</h2>
            {CustomerInfoList.map(cu => <CustomerItem key={cu.id} Customer={cu}/> )}
        </div>
    );
};


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
}

export default CustomerIndex;