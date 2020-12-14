import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {CommentInfo} from "../../Context/DataTypeList";
import Tweet from "./Tweet";
import {DataContext} from "../../Context/DataContext";
import Loading from "../Common/Loading";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {
    const {Comments,isLoading} = useContext(DataContext)
    const [tweets,setTweets] = useState<CommentInfo[]>(Comments.Data);
    useEffect(() => {
        setTweets(Comments.Data)
    },[Comments.Data])

    if(isLoading)
        return <Loading/>

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
