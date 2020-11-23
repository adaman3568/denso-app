import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import CarProfile from "./CarProfile";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    return (
        <div>
            <CarProfile data={carData}/>
            {comments.map((item,index) => <Tweet key={index} tweet={item}/>)}
        </div>
    );
};

export default CarDetail;

export {}