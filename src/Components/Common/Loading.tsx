import React, {FC} from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const myStyle = makeStyles((theme) => ({
    margin : {
        marginTop : theme.spacing(4)
    }}))

const Loading : FC = () => {
    const classes = myStyle();
    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.margin}
        >
            <CircularProgress/>
        </Grid>
    )
};

export default Loading