import firebase, {DocumentList} from "../Firebase";
import {useEffect, useState} from "react";
import {CommentInfo} from "../Context/DataTypeList";

export const useComment = (id : string) => {
    const db = firebase.firestore();
    const [comment, setComment] = useState<CommentInfo | null>(null);

    useEffect(() => {
        const setCommentItem = async (): Promise<CommentInfo> => {
            const snapshot = await db.collection(DocumentList.Comments).doc(id).get();
            console.log('execute getting firestore');
            const data = snapshot.data();
            const documentData : CommentInfo = data as CommentInfo;
            const res : CommentInfo = {
                id : snapshot.id,
                Body : documentData.Body,
                ReplyCommentRef : [...documentData.ReplyCommentRef]
            };
            return res
        };

        setCommentItem().then(res => {
            setComment(res);
        })
    }, []);

    return {comment}

};