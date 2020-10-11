import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from "@material-ui/core";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const {Car,Comment} = useContext(DataContext);
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const d : CarInfo | undefined = Car.Data.find(item => item?.uid === props.match.params.id);
        if(d !== undefined) {
            setCarData(d)
            Comment.Func.GetCarComments(props.match.params.id).then(d => setComments(d))
        }
    },[]);

    return (
        <div>
            <h2>this is id:{props.match.params.id} car detail page.</h2>
            <Button size={'large'} onClick={() => Car.Func.DeleteCar(props.match.params.id)}>
                <DeleteIcon/>
                削除
            </Button>
            <p>{carData.uid}</p>
            <p>{carData.Name}</p>
            <p>{carData.Detail}</p>
            {comments.map((item,index) => <Tweet key={index} tweet={item}/>)}
        </div>
    );
};

export default CarDetail;

export {}