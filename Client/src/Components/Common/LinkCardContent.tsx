import React, {FC, ReactNode} from 'react';
import {CardContent} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    children : ReactNode,
    path : string,
    className? : string
}

const myStyle = makeStyles((theme) => ({
    cardLink : {
        textDecoration : 'none',
        color : 'black'
    }
}));

const LinkCardContent : FC<Props> = ({children,path,className}) => {
    const classes = myStyle();

    return (

            <CardContent className={className}>
                <Link to={path} className={classes.cardLink}>
                {children}
                </Link>
            </CardContent>

    );
};

export default LinkCardContent;