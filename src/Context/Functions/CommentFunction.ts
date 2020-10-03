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
    const snapshot = await firebase.firestore().collection('Employees').doc(uid).get();
    const data = snapshot.data() as EmployeeInfo;
    let commentData : CommentInfo[] = [];
    data.CommentsRef?.map(item =>{
        item.get().then(d => {
            let cm = d.data() as CommentInfo;
            cm.uid = d.id;
            commentData.push(cm)}
            )
    });

    return commentData
}