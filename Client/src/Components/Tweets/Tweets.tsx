import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {CommentInfo} from "../../Context/DataTypeList";
import Cookies from "js-cookie";
import axios from 'axios'
import {apiEndPointBase} from "../../Firebase";
import Tweet from "./Tweet";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {

    const [tweets,setTweets] = useState<CommentInfo[]>([]);

    const getDisplayComments = () => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}comments`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
            const d = res.data as CommentInfo[];
            setTweets(d)
            }
        );
    };

    useEffect(() => {
        getDisplayComments();
    },[tweets]);

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
