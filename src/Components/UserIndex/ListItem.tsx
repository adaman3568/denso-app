import React, {ReactNode} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import {DirectionsCar,PermIdentity} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";



const mainListItems = () => {

    const classes = myStyles();

    return (
        <div>
            <Link to={'/'} className={classes.normalText}>
                <ListItem button>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                    <ListItemText primary="ホーム"/>
                </ListItem>
            </Link>
            <Link to={'/'} className={classes.normalText}>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="ユーザー管理"/>
                </ListItem>
            </Link>
            <ListItem button>
                <ListItemIcon>
                    <PermIdentity/>
                </ListItemIcon>
                <ListItemText primary="プロフィール"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="得意先管理・閲覧"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <DirectionsCar/>
                </ListItemIcon>
                <ListItemText primary="車両管理"/>
            </ListItem>
        </div>);
};

const myStyles = makeStyles((theme) => ({
    normalText : {
        textDecoration : 'none',
        color : theme.palette.text.primary
    }
}));

type Props = {
    path : string,
    name : string,
    Icon : ReactNode
}

const LinkListItem : React.FC<Props> = (prop: Props) => {
    const classes = myStyles();
    return (
        <Link to={prop.path} className={classes.normalText}>
            <ListItem button>
                <ListItemIcon>
                    {prop.Icon}
                </ListItemIcon>
                <ListItemText primary={prop.name}/>
            </ListItem>
        </Link>)
};

export {mainListItems}