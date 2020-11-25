import {Grid, GridProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";

interface Props extends GridProps{}
const useStyle = makeStyles((theme) => ({
    centeringGridItem : {
        textAlign : 'center',
        margin : theme.spacing(1)
    }
}));
const CenteringGridItem : FC<Props> = (Props) => {
    const classes = useStyle();
    return (
        <Grid item {...Props} className={classes.centeringGridItem + ' ' + Props.className}>
            {Props.children}
        </Grid>
)};

export default CenteringGridItem