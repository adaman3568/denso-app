import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";

const CarIndex : FC = () => {
    const {CarFunc} = useContext(DataContext)
    const [carItems ,setCarItems] = useState<CarInfo[]>([]);

    useEffect(() => {
        setCarItems(CarFunc.GetAllCarData());
    },[])

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {carItems.map(car => <CarItem key={car.id} Car={car} />)}
        </div>
    );
};


export default CarIndex;