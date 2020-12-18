import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {CommentInfo} from "../../Context/DataTypeList";
import Tweet from "./Tweet";
import {DataContext} from "../../Context/DataContext";
import Loading from "../Common/Loading";
import {CommentDataContext} from "../../Context/CommentDataContext";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {
    const {Data,isLoading} = useContext(CommentDataContext)

    if(isLoading)
        return <Loading/>

    return (
            <Grid item xs={12}>
                {Data.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </Grid>
    );
};

export default Tweets;
