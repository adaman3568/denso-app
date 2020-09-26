import React, {FC} from 'react';
import {Card, Grid} from "@material-ui/core";

type CustomerInfo = {
    id : number
    customerName : string
    CarCount : number
    CommentCount : number
    LastCommentDate : string
    Address : string
}

const CustomerInfoList : CustomerInfo[] = [
    {id : 1,customerName : "合同会社Rst.com",CarCount : 1,CommentCount : 2,LastCommentDate : '2020/09/21',Address : "東京都世田谷区1-2-3"}
]

const CustomerIndex : FC = () => {
    return (
        <div>
            <h2>this is CustomerIndex page.</h2>
        </div>
    );
};


type Props = {
    Customer : CustomerInfo
}




const CustomerItem : FC<Props> = ({Customer}) => {
    return(
        <Card>
            <Grid container>

            </Grid>
        </Card>
    )
}

export default CustomerIndex;