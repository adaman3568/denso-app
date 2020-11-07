import React, {FC} from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

type props = {
    EditAction? : () => void;
    DeleteAction? : () => void
}

const DeleteUpdateButton : FC<props> = ({EditAction,DeleteAction}) => {

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