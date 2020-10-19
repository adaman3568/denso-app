import React, {useContext, useEffect, useState} from 'react';
import Tweet from "./Tweet";
import {DataContext} from "../../Context/DataContextProvider";
import ScrollableTabsButtonAuto from "../Common/Tab/ScrollableTabsButtonAuto";
import TabContextProvider from "../Common/Tab/TabContext";
import {Grid} from "@material-ui/core";
import {CommentInfo} from "../../Context/DataTypeList";
import Loading from "../Common/Loading";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {

    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const {Comment} = useContext(DataContext);

    useEffect(() => {
        setTweets(Comment.Data);
    },[]);

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
