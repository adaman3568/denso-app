import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";
import {Link} from 'react-router-dom'
import {PathList} from "../../Routing/path";
import {Button, Fade, Grid, Modal} from "@material-ui/core";
import LinkButton from "../Common/LinkButton";
import Backdrop from "@material-ui/core/Backdrop";
import PostTweet from "../PostTweet";
import {makeStyles} from "@material-ui/core/styles";
import AddUser from "../AddUser/AddUser";
import CarCreate from "./CarCreate";

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
}))

const CarIndex : FC = () => {

    const classes = useStyle();

    const [open,setOpen] = useState<boolean>(false);

    const {Car} = useContext(DataContext)
    const [carItems,setCarItems] = useState<CarInfo[]>([]);
    useEffect(() => {
        const c : CarInfo[] = Car.Data.filter((c) : c is Exclude<typeof c,undefined> => c !== undefined);
        setCarItems(c)
    },[]);

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            <Button  size={'small'} color={"primary"} variant="contained" onClick={() => setOpen(true)}>車両追加</Button>
            {carItems.map(car => <CarItem key={car.id} Car={car} />)}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h1>
                            Car Create
                        </h1>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};


export default CarIndex;

export {}