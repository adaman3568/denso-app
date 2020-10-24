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
import ModalWindow from "../Common/ModalWindow";

const CarIndex : FC = () => {
    const [open,setOpen] = useState<boolean>(false);

    const {Car} = useContext(DataContext)
    const [carItems,setCarItems] = useState<CarInfo[]>([]);
    useEffect(() => {
        const c : CarInfo[] = Car.Data.filter((c) : c is Exclude<typeof c,undefined> => c !== undefined);
        setCarItems(c)
    },[]);

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            <Button  size={'small'} color={"primary"} variant="contained" onClick={() => setOpen(true)}>車両追加</Button>
            {carItems.map(car => <CarItem key={car.id} Car={car} />)}
            <ModalWindow ChildComponent={<h1>this is car add.</h1>} handleClose={() => setOpen(false)} IsOpen={open}/>
        </div>
    );
};


export default CarIndex;

export {}