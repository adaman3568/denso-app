import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import {CustomerInfo} from "./CustomerIndex";
import CommentCount from "../Common/CommentCount";
import LinkCard from "../Common/LinkCard";
import {PathList} from "../../Routing/path";


type Props = {
    Customer : CustomerInfo
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


const CustomerItem : FC<Props> = ({Customer}) => {

    const classes = myStyle();

    return(
        <LinkCard path={`${PathList.customerDetail}/${Customer.id}`}>
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
                    <div className={classes.cardInfo}>
                        車両台数：{Customer.CarCount}
                        <CommentCount displayCount={Customer.CommentCount} className={classes.commentCount}/>
                    </div>
                </Grid>
                <Grid sm={6}>
                    最終コメント日付：{Customer.LastCommentDate}
                </Grid>
            </Grid>
        </LinkCard>
    )
};

export default CustomerItem