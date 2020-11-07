import React, {useContext, useEffect, useState} from 'react';
import Tweet from "./Tweet";
import {DataContext} from "../../Context/DataContextProvider";
import {Grid} from "@material-ui/core";
import {CommentInfo} from "../../Context/DataTypeList";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {

    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const {Comment} = useContext(DataContext);

    useEffect(() => {
        setTweets(Comment.Data);
    },[tweets]);

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
