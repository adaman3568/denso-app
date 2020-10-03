import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";

const CarIndex : FC = () => {
    const {Customer} = useContext(DataContext)
    const [carItems,setCarItems] = useState<CarInfo[]>([]);
    // useEffect(() => {
    //     const CarItems : (CarInfo | undefined)[] = Customer.Data.flatMap(item => item.Cars);
    //     console.log(CarItems);
    //     const c : CarInfo[] = CarItems.filter((c) : c is Exclude<typeof c,undefined> => c !== undefined);
    //     setCarItems(c)
    // },[]);

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {/*{carItems.map(car => <CarItem key={car.uid} Car={car} />)}*/}
        </div>
    );
};


export default CarIndex;

export {}