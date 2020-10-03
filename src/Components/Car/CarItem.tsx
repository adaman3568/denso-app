import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import CommentCount from "../Common/CommentCount";
import {PathList} from "../../Routing/path";
import LinkCard from "../Common/LinkCard";
import {CarInfo} from "../../Context/DataTypeList";

type Props = {
    Car : CarInfo
}

const myStyle = makeStyles((theme) => ({
    detail : {
        padding : theme.spacing(2)
    },
}));

const CarItem : FC<Props> = ({Car}) => {
    const classes = myStyle();
    return (
        <LinkCard path={`${PathList.carDetail}/${Car.uid}`}>
            <Grid container>
                <Grid sm={12}>
                    <CardTitle>
                        {Car.Name}
                    </CardTitle>
                </Grid>
                <Grid sm={12}>
                    <Typography className={classes.detail}>
                        {Car.Detail}
                    </Typography>
                </Grid>
            </Grid>
        </LinkCard>
    )
};

export default CarItem