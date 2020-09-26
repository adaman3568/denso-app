import React, {FC} from 'react';
import {Card, Grid} from "@material-ui/core";

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
            <h2>This is CarIndex page.</h2>
            {CarItems.map(car => <CarItem key={car.id} Car={car} />)}
        </div>
    );
};

type Props = {
    Car : CarInfo
}

const CarItem : FC<Props> = ({Car}) => {
    return (
        <Card>
            <Grid container>
                <Grid sm={12}>{Car.CarName}</Grid>
                <Grid sm={12}>{Car.Detail}</Grid>
                <Grid sm={6}>コメント件数{Car.CommentCount}</Grid>
                <Grid sm={6}>最終コメント日時：{Car.LastCommentDate}</Grid>
            </Grid>
        </Card>
    )
}
export default CarIndex;