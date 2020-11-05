import React, {FC, ReactNode, useEffect, useState} from 'react';
import {CommentInfo} from "../../Context/DataTypeList";
import {RouteComponentProps} from "react-router-dom";
import firebase, {DocumentList} from '../../Firebase';
import {getComment} from "../../Context/Functions/CommentFunction";
import {match} from "react-router";
import Loading from "../Common/Loading";
import {useComment} from "../../CustomHooks/useComment";

type pageProps = {} & RouteComponentProps<{id : string}>

const TweetsDetail : FC<pageProps> = ({match}) => {
    const {comment} = useComment(match.params.id);

    if (comment){
        return (
            <div>
                <p>{match.params.id}</p>
                <p>{comment.id}</p>
                <p>{comment.Body}</p>
                <RepComment Comment={comment}/>
            </div>
        )
    }else{
        return <Loading/>;
    }
};

type Props = {
    Comment : CommentInfo
}
const RepComment : FC<Props> = ({Comment}) => {
    const [repComments, setRepComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        console.log(Comment);
        const setRepCommentItems = async (): Promise<CommentInfo[]> => {
            if (Comment.ReplyCommentRef != null && Comment.ReplyCommentRef != undefined) {
                const res: Promise<CommentInfo>[] = Comment.ReplyCommentRef.map(item => getComment(item))
                return await Promise.all(res)
            }
            return []
        };
        setRepCommentItems().then(res => setRepComments(res))
    },[])

    return <div>
        {repComments.map(item => <div><p>{item.id}</p><p>{item.Body}</p></div>)}
        </div>
}


export default TweetsDetail;