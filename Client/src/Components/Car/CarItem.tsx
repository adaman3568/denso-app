import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Card, CardActions, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import {PathList} from "../../Routing/path";
import LinkCardContent from "../Common/LinkCardContent";
import {CarInfo} from "../../Context/DataTypeList";
import DeleteUpdateButton from "../Common/DeleteUpdateButton";
import {DataItemProps} from "../../PropsList";

const myStyle = makeStyles((theme) => ({
    detail : {
        padding : theme.spacing(2)
    },
    card : {
    padding : theme.spacing(2),
        margin : theme.spacing(3)
}
}));

const CarItem : FC<DataItemProps<CarInfo>> = ({Data,EditModalOpen,DeleteModalOpen}) => {

    const classes = myStyle();
    return (
        <Card className={classes.card}>
            <LinkCardContent path={`${PathList.carDetail}/${Data.id}`}>
                <Grid container>
                    <Grid sm={12}>
                        <CardTitle>
                            {Data.carNo}
                        </CardTitle>
                    </Grid>
                    <Grid sm={12}>
                        <Typography className={classes.detail}>
                            型式：{Data.carType}
                        </Typography>
                    </Grid>
                    <Grid sm={12}>
                        <Typography className={classes.detail}>
                            年式：{Data.releaseYear}
                        </Typography>
                    </Grid>
                    <Grid sm={12}>
                        <Typography className={classes.detail}>
                            メーカー：{Data.maker}
                        </Typography>
                    </Grid>
                    <Grid sm={12}>
                        <Typography className={classes.detail}>
                            詳細：{Data.detail}
                        </Typography>
                    </Grid>
                </Grid>
            </LinkCardContent>
            <CardActions>
                <DeleteUpdateButton EditAction={() => EditModalOpen(Data)} DeleteAction={() => DeleteModalOpen(Data)}/>
            </CardActions>
        </Card>
    )
};

export default CarItem