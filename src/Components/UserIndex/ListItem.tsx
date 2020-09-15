import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import {DirectionsCar,PermIdentity} from "@material-ui/icons";

const mainListItems = () => {
    return (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="ユーザー管理" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PermIdentity />
            </ListItemIcon>
            <ListItemText primary="プロフィール" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="得意先管理・閲覧" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="車両管理" />
        </ListItem>
    </div>)
};

export {mainListItems}