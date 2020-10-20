import React, {FC} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import {PathList} from "../../../Routing/path";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    normalButton : {
        textDecoration : 'none',
        color : 'white'
    }
}))

const ProfileIconButton : FC = () => {
    const classes = useStyle();

    return (
        <IconButton color="inherit">
            <Link to={PathList.profile}>
                <AccountCircleIcon className={classes.normalButton}/>
            </Link>
        </IconButton>
    );
};

export default ProfileIconButton;