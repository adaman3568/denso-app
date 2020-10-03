import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const {Car} = useContext(DataContext);
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);

    useEffect(() => {
        const d : CarInfo | undefined = Car.Data.find(item => item?.uid === props.match.params.id);
        if(d !== undefined) setCarData(d)
    },[]);

    return (
        <div>
            <h2>this is id:{props.match.params.id} car detail page.</h2>
            <p>{carData.uid}</p>
            <p>{carData.Name}</p>
        </div>
    );
};

export default CarDetail;

export {}