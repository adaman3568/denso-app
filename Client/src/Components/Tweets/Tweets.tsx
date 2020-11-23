import React, {useContext, useEffect, useState} from 'react';
import Tweet from "./Tweet";
import {DataContext} from "../../Context/DataContextProvider";
import {Grid} from "@material-ui/core";
import {CommentInfo} from "../../Context/DataTypeList";
import Cookies from "js-cookie";
import axios from 'axios'
import {apiEndPointBase} from "../../Firebase";
import NewTweet from "./NewTweet";

type Props = {
    ShowImg? : boolean
}

export type newCommentInfo = {
    id: number,
    detail: string,
    created: Date,
    updated?: Date,
    parentCarId: number,
    userId: number,
    parentCommentId?: number,
    repCommentCnt: number,
    lastRepCommentDate :Date
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {

    const [tweets,setTweets] = useState<newCommentInfo[]>([]);
    const {Comment} = useContext(DataContext);

    const getDisplayComments = () => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}comments`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
            const d = res.data as newCommentInfo[];
            setTweets(d)
            }
        );
    };

    useEffect(() => {
        getDisplayComments();
    },[tweets]);

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <NewTweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
