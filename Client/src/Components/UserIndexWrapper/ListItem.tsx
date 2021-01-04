import React, {FC, ReactNode} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import {DirectionsCar} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {PathList} from "../../Routing/path";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BusinessIcon from '@material-ui/icons/Business';

type ListItemProps = {
    isAdmin : boolean
}

export const MainListItems : FC<ListItemProps> = ({isAdmin}) => {

    return (
        <div>
            <LinkListItem path={PathList.home} name={'ホーム'} Icon={<HomeIcon/>}/>
            {/*adminの場合の表示する。*/}
            {isAdmin && <LinkListItem path={PathList.employeeManage} name={'ユーザー登録'} Icon={<PersonAddIcon/>}/>}
            <LinkListItem path={PathList.employee} name={'ユーザー一覧'} Icon={<PeopleIcon/>}/>
            <LinkListItem path={PathList.customers} name={'得意先管理・閲覧'} Icon={<BusinessIcon/>}/>
            <LinkListItem path={PathList.cars} name={'車両管理'} Icon={<DirectionsCar/>}/>
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