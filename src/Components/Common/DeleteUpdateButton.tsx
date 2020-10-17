import React, {FC} from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
    editUrl : string,
    deleteUrl : string
}

const useStyle = makeStyles((theme) => ({
    link : {
        textDecoration : 'none',
        color : 'white'
    }
}));


const DeleteUpdateButton : FC<Props> = ({editUrl,deleteUrl}) => {
    const classes = useStyle();

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button>
                <Link to={editUrl} className={classes.link}>
                    <EditIcon/>
                    編集
                </Link>
            </Button>
            <Button>
                <Link to={deleteUrl} className={classes.link}>
                    <DeleteIcon/>
                    削除
                </Link>
            </Button>
        </ButtonGroup>
    );
};

export default DeleteUpdateButton;