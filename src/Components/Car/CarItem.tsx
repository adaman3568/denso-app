import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import CommentCount from "../Common/CommentCount";
import {CarInfo} from "./CarIndex";

type Props = {
    Car : CarInfo
}

const myStyle = makeStyles((theme) => ({
    card : {
        margin : theme.spacing(3),
        padding : theme.spacing(2)
    },
    detail : {
        padding : theme.spacing(2)
    }
}))

const CarItem : FC<Props> = ({Car}) => {
    const classes = myStyle();
    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid sm={12}>
                    <CardTitle>
                        {Car.CarName}
                    </CardTitle>
                </Grid>
                <Grid sm={12}>
                    <Typography className={classes.detail}>
                        {Car.Detail}
                    </Typography>
                </Grid>
                <Grid sm={6}>
                    <CommentCount displayCount={Car.CommentCount}/>
                </Grid>
                <Grid sm={6}>最終コメント日時：{Car.LastCommentDate}</Grid>
            </Grid>
        </Card>
    )
};

export default CarItem