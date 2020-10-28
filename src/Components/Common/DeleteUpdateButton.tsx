import React, {FC} from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyle = makeStyles((theme) => ({
    link : {
        textDecoration : 'none',
        color : 'white'
    }
}));

type props = {
    EditAction? : () => void;
    DeleteAction? : () => void
}

const DeleteUpdateButton : FC<props> = ({EditAction,DeleteAction}) => {
    const classes = useStyle();

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={EditAction}>
                    <EditIcon/>
                    編集
            </Button>
            <Button onClick={DeleteAction}>
                    <DeleteIcon/>
                    削除
            </Button>
        </ButtonGroup>
    );
};

export default DeleteUpdateButton;