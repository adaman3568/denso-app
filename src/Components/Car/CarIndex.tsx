import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {CarInfo, DataContext} from "../../Context/DataContextProvider";

const CarIndex : FC = () => {
    const {functions} = useContext(DataContext)
    const [carItems ,setCarItems] = useState<CarInfo[]>([]);

    useEffect(() => {
        setCarItems(functions.GetAllCarData());
    },[])

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {carItems.map(car => <CarItem key={car.id} Car={car} />)}
        </div>
    );
};


export default CarIndex;