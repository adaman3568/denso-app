import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const {Customer} = useContext(DataContext);
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);

    useEffect(() => {
        const CarList = Customer.Data.flatMap(item => item.Cars);
        const d : CarInfo | undefined = CarList.find(item => item?.id === parseInt(props.match.params.id));
        if(d !== undefined) setCarData(d)
    },[]);

    return (
        <div>
            <h2>this is id:{props.match.params.id} car detail page.</h2>
            <p>{carData.id}</p>
            <p>{carData.CarName}</p>
            <p>{carData.CommentCount}</p>
            <p>{carData.Detail}</p>
            <p>{carData.LastCommentDate}</p>
        </div>
    );
};

export default CarDetail;

export {}