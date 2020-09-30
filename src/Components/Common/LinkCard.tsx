import React, {FC, ReactNode} from 'react';
import {Card} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    children : ReactNode,
    path : string,
    className? : string
}

const myStyle = makeStyles((theme) => ({
    cardLink : {
        textDecoration : 'none'
    },
    card : {
        margin : theme.spacing(3),
        padding : theme.spacing(2)
    },
}));

const LinkCard : FC<Props> = ({children,path,className}) => {
    const classes = myStyle();

    return (
        <Link to={path} className={classes.cardLink}>
            <Card className={classes.card + ' ' + className}>
                {children}
            </Card>
        </Link>
    );
};

export default LinkCard;