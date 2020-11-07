import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type props = {
    path : string,
    value : string
}

const useStyle = makeStyles((theme) => ({
    cardLink : {
        textDecoration : 'none',
        marginRight : theme.spacing(1)
    }
}));

const LinkButton : FC<props> = ({path,value}) => {
    const classes = useStyle();

    return (
        <Link to={path} className={classes.cardLink}>
            <Button size={'small'} color={"primary"} variant="contained" >{value}</Button>
        </Link>
    );
};

export default LinkButton;