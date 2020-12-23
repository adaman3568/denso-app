import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import Tweet from "./Tweet";
import Loading from "../Common/Loading";
import {CommentDataContext} from "../../Context/CommentDataContext";
import {CommentInfo} from "../../Context/DataTypeList";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {
    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const {Data,isLoading} = useContext(CommentDataContext);

    useEffect(() => {
        setTweets(Data)
    },[Data]);

    if(isLoading)
        return <Loading/>

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
