import React, {FC, useEffect, useState} from 'react';
import {CommentInfo} from "../../Context/DataTypeList";
import {RouteComponentProps} from "react-router-dom";
import {getComment} from "../../Context/Functions/CommentFunction";
import Loading from "../Common/Loading";
import {useComment} from "../../CustomHooks/useComment";
import {newCommentInfo} from "./Tweets";
import Cookies from "js-cookie";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";

type pageProps = {} & RouteComponentProps<{id : string}>

const TweetsDetail : FC<pageProps> = ({match}) => {
    const {comment} = useComment(match.params.id);

    if (comment){
        return (
            <div>
                <p>{match.params.id}</p>
                <p>{comment.id}</p>
                <p>{comment?.detail}</p>
                <RepComment Comment={comment}/>
            </div>
        )
    }else{
        return <Loading/>;
    }
};

type Props = {
    Comment : newCommentInfo
}
const RepComment : FC<Props> = ({Comment}) => {
    const [repComments, setRepComments] = useState<newCommentInfo[]>([]);

    useEffect(() => {
        const jwtToken = Cookies.get("denso-app-jwt-token");
        const apiPath = `${apiEndPointBase}comments/${Comment.id}/repcomments`;
        axios.get(apiPath,{
            headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${jwtToken}`
                }}).then(res => {
         const data = res.data as newCommentInfo[]
            setRepComments(data)
        })
    },[]);

    return <div>
        {repComments.map(item => <div><p>{item.id}</p><p>{item.detail}</p></div>)}
        </div>
}


export default TweetsDetail;