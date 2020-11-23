import firebase, {apiEndPointBase, DocumentList} from "../Firebase";
import {useEffect, useState} from "react";
import {CommentInfo} from "../Context/DataTypeList";
import axios from "axios";
import {newCommentInfo} from "../Components/Tweets/Tweets";
import Cookies from "js-cookie";

export const useComment = (id : string) => {
    const [comment, setComment] = useState<newCommentInfo | null>(null);

    useEffect(() => {
        const setCommentItem = async (): Promise<newCommentInfo> => {
            const jwtToken = Cookies.get("denso-app-jwt-token");
            const apiPath = `${apiEndPointBase}comments/${id}`;
            const res = await axios.get(apiPath,{
                headers :
                    {'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${jwtToken}`
                    }})
            const data = res.data as newCommentInfo;
            return data;
        };

        setCommentItem().then(res => {
            setComment(res);
        })
    }, []);

    return {comment}

};