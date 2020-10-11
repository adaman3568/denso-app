import {CommentInfo, EmployeeInfo} from "../DataTypeList";
import firebase, {DocumentList} from '../../Firebase';

const db = firebase.firestore();

// 全てのコメントを取得する
export const GetAllCommentsFromDB = async () : Promise<CommentInfo[]> => {
    let data : CommentInfo[] = [];
    const snapshot = await db.collection(DocumentList.Comments).get();
    snapshot.forEach(d => {
        let cm : CommentInfo = d.data() as CommentInfo;
        cm.id = d.id;
        data.push(cm)}
    );
    return data
};

// 従業員に紐づくコメントを取得する
export const GetEmpCommentsFromDb = async (uid : string) : Promise<CommentInfo[]> => {
    const snapshot = await db.collection(DocumentList.Employees).doc(uid).get();
    const emp : EmployeeInfo = snapshot.data() as EmployeeInfo

    if(emp.CommentsRef !== undefined){
        //refデータをまとめて取得する場合は、一旦Promiseの配列にする。
        const data : Promise<CommentInfo>[] = emp.CommentsRef.map((item) => getComment(item));
        // その後Promise.all()に配列を投げると同時に、awaitで処理を待って、返す。
        const commentData : CommentInfo[] = await Promise.all(data);
        return commentData;
    }else{
        return []
    }
};

// 車両に紐づくコメントを取得する。
export const GetCarCommentsFromDB = async (uid : string) : Promise<CommentInfo[]> => {
    const snapshot = await db.collection(DocumentList.Cars).doc(uid).get();
    const emp : EmployeeInfo = snapshot.data() as EmployeeInfo

    if(emp.CommentsRef !== undefined){
        //refデータをまとめて取得する場合は、一旦Promiseの配列にする。
        const data : Promise<CommentInfo>[] = emp.CommentsRef.map((item) => getComment(item));

        // その後Promise.all()に配列を投げると同時に、awaitで処理を待って、返す。
        const commentData : CommentInfo[] = await Promise.all(data);
        return commentData;
    }else{
        return []
    }
};

//　awaitを使うなら、asyncをセットで使わないといけない。=>asyncを使う時点で戻り値はPromiseになる。
// awaitを使うなら、必然的に戻り値はPromiseになる。
const getComment = async (comRef : firebase.firestore.DocumentReference) : Promise<CommentInfo> => {
    const com = await comRef.get();
    const comment : CommentInfo = com.data() as CommentInfo;
    comment.id = com.id;
    return comment;
};