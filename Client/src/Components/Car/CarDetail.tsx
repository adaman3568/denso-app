import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import CarProfile from "./CarProfile";
import {CarDataContext} from "../../Context/CarDataContext";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);
    const {Data,Func} = useContext(CarDataContext);

    useEffect(() => {
        const car = Data.find(item => item.id === parseInt(props.match.params.id));
        if(car){
            setCarData(car);
        };
        Func.GetChildComments(parseInt(props.match.params.id)).then(res => setComments(res)).catch(err => console.log(err));
    },[])

    return (
        <div>
            <CarProfile data={carData}/>
            {comments.map((item,index) => <Tweet key={index} tweet={item}/>)}
        </div>
    );
};

export default CarDetail;

export {}