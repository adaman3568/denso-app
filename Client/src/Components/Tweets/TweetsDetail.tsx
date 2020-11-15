import React, {FC, useEffect, useState} from 'react';
import {CommentInfo} from "../../Context/DataTypeList";
import {RouteComponentProps} from "react-router-dom";
import {getComment} from "../../Context/Functions/CommentFunction";
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
        const setRepCommentItems = async (com : CommentInfo): Promise<CommentInfo[]> => {
            console.log(com);
            const res: Promise<CommentInfo>[] | undefined = com.ReplyCommentRef?.map(item => getComment(item));
            if(res === undefined)
                return [];

            return await Promise.all(res)
        };

        setRepCommentItems(Comment).then(res => setRepComments(res))
    },[])

    return <div>
        {repComments.map(item => <div><p>{item.id}</p><p>{item.Body}</p></div>)}
        </div>
}


export default TweetsDetail;