import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import CarProfile from "./CarProfile";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";
import Cookies from "js-cookie";

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    const [carData, setCarData] = useState<CarInfo>({} as CarInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}cars/${props.match.params.id}`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CarInfo;
                setCarData(d)
            }
        );

        axios.get(`${apiEndPointBase}cars/${props.match.params.id}/comments`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CommentInfo[];
                setComments(d)
            }
        );
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