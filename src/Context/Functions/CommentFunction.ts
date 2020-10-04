import {CommentInfo, EmployeeInfo} from "../DataTypeList";
import firebase from '../../Firebase';

export const GetAllComment = async () : Promise<CommentInfo[]> => {
    let data : CommentInfo[] = [];
    const snapshot = await firebase.firestore().collection('Comments').get();
    snapshot.forEach(d => {
        let cm : CommentInfo = d.data() as CommentInfo;
        cm.uid = d.id;
        data.push(cm)}
    );
    return data
};

export const SetEmpComment = async (uid : string) : Promise<CommentInfo[]> => {
    const db = firebase.firestore();
    const snapshot = await db.collection('Employees').doc(uid).get();
    const emp : EmployeeInfo = snapshot.data() as EmployeeInfo

    if(emp.CommentsRef !== undefined){
        let comments : CommentInfo[] = [];
        //refデータをまとめて取得する場合は、一旦Promiseの配列にする。
        const data : Promise<CommentInfo>[] = emp.CommentsRef.map((item) => getComment(item));

        // その後Promise.all()に配列を投げると同時に、awaitで処理を待って、返す。
        const commentData : CommentInfo[] = await Promise.all(data);
        return commentData;
    }else{
        return []
    }
};

const getComment = async (comRef : firebase.firestore.DocumentReference) : Promise<CommentInfo> => {
    const com = await comRef.get();
    const comment : CommentInfo = com.data() as CommentInfo;
    comment.uid = com.id;
    return comment;
};