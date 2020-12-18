import React, {FC, useContext, useEffect, useState} from 'react';
import {CommentInfo} from "../../Context/DataTypeList";
import {RouteComponentProps} from "react-router-dom";
import Loading from "../Common/Loading";
import {useComment} from "../../CustomHooks/useComment";
import Cookies from "js-cookie";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import Tweet from "./Tweet";
import {makeStyles} from "@material-ui/core/styles";
import {CommentDataContext} from "../../Context/CommentDataContext";

type pageProps = {} & RouteComponentProps<{id : string}>

const TweetsDetail : FC<pageProps> = ({match}) => {
    const {comment} = useComment(match.params.id);

    if (comment){
        return (
            <>
            <Tweet tweet={comment}/>
            <RepComment Comment={comment}/>
            </>
        )
    }else{
        return <Loading/>;
    }
};

type Props = {
    Comment : CommentInfo
}

const useStyle = makeStyles((theme) => ({
    repCommentWrapper : {
        marginLeft : theme.spacing(5)
    }
}));

const RepComment : FC<Props> = ({Comment}) => {
    const classes = useStyle();

    const [repComments, setRepComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const jwtToken = Cookies.get("denso-app-jwt-token");
        const apiPath = `${apiEndPointBase}comments/${Comment.id}/repcomments`;
        axios.get(apiPath,{
            headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${jwtToken}`
                }}).then(res => {
         const data = res.data as CommentInfo[]
            setRepComments(data)
        })
    },[]);

    return (
            <div className={classes.repCommentWrapper}>
                {repComments.map((item,index) => <Tweet key={index} tweet={item} showAction={false}/>)}
            </div>
    )};

export default TweetsDetail;