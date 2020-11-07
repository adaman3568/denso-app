import React, {FC, ReactNode} from 'react';
import {Fade, Modal} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    IsOpen : boolean,
    handleClose : () => void,
    ChildComponent : ReactNode
}

const useStyle = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ModalWindow : FC<Props> = ({IsOpen,handleClose,ChildComponent}) => {
    const classes = useStyle();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={IsOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={IsOpen}>
                <div className={classes.paper}>
                    {ChildComponent}
                </div>
            </Fade>
        </Modal>
    );
};

export default ModalWindow;