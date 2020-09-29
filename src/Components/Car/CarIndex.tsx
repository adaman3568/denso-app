import React, {FC} from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardTitle from "../Common/CardTitle";
import Title from "../Common/Title";
import CommentCount from "../Common/CommentCount";

type CarInfo = {
    id : number,
    CarName : string,
    Detail : string,
    CommentCount : number,
    LastCommentDate : string
}

const CarItems : CarInfo[] = [
    {id : 1,CarName : '11-22',Detail : 'etc装着済み',CommentCount : 12 , LastCommentDate : '2020/12/11 12:34:23'},
    {id : 1,CarName : '12-45',Detail : 'etc装着済み＆デジタコ',CommentCount : 10 , LastCommentDate : '2020/12/10 10:45:11'}
]

const CarIndex : FC = () => {
    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {CarItems.map(car => <CarItem key={car.id} Car={car} />)}
        </div>
    );
};

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
}
export default CarIndex;