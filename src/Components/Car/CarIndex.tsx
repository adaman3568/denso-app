import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";
import {Link} from 'react-router-dom'
import {PathList} from "../../Routing/path";
import {Button} from "@material-ui/core";
import LinkButton from "../Common/LinkButton";

const CarIndex : FC = () => {
    const {Car} = useContext(DataContext)
    const [carItems,setCarItems] = useState<CarInfo[]>([]);
    useEffect(() => {
        const c : CarInfo[] = Car.Data.filter((c) : c is Exclude<typeof c,undefined> => c !== undefined);
        setCarItems(c)
    },[]);

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            <LinkButton path={PathList.carCreate} value={'車両追加'}/>
            {carItems.map(car => <CarItem key={car.id} Car={car} />)}
        </div>
    );
};


export default CarIndex;

export {}