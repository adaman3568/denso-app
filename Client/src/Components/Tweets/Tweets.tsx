import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import Loading from "../Common/Loading";
import {CommentDataContext} from "../../Context/CommentDataContext";
import {CommentInfo} from "../../Context/DataTypeList";
import {makeStyles} from "@material-ui/core/styles";
import CommentItem from "./V2/Comments";

type Props = {
    ShowImg? : boolean
}

const useStyle = makeStyles((theme) => ({
    postArticleWrapper : {
        marginTop : theme.spacing(2)
    }
}))

const Tweets : React.FC<Props> = ({ShowImg = true}) => {
    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const {Data,isLoading} = useContext(CommentDataContext);

    const classes = useStyle();

    useEffect(() => {
        setTweets(Data)
    },[Data]);

    if(isLoading)
        return <Loading/>

    return (
            <Grid item xs={12}>
                {tweets.map((item,index) => <CommentItem className={classes.postArticleWrapper} key={index} Comment={item}/>)}
            </Grid>
    );
};

export default Tweets;
