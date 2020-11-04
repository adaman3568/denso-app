import React, {FC, useContext, useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom'
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Typography} from "@material-ui/core";
import {PathList} from "../../Routing/path";
import CarProfile from "./CarProfile";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const {Car,Comment} = useContext(DataContext);
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);
    const [carName, setCarName] = useState<string>(carData.Name);
    const [carDetail, setCarDetail] = useState<string>(carData.Detail);

    useEffect(() => {
        const d : CarInfo | undefined = Car.Data.find(item => item?.id === props.match.params.id);
        if(d !== undefined) {
            setCarData(d);
            setCarName(d.Name);
            setCarDetail(d.Detail);
            Comment.Func.GetCarComments(props.match.params.id).then(d => setComments(d))
        }
    },[]);

    return (
        <div>
            <CarProfile data={carData}/>
            {comments.map((item,index) => <Tweet key={index} tweet={item}/>)}
        </div>
    );
};

export default CarDetail;

export {}