import {CommentInfo} from "../DataTypeList";
import firebase from '../../Firebase';

export const GetAllComment = async () : Promise<CommentInfo[]> => {
    let data : CommentInfo[] = [];
    const snapshot = await firebase.firestore().collection('Comments').get()
    snapshot.forEach(d => {
        let cm : CommentInfo = d.data() as CommentInfo;
        cm.uid = d.id;
        data.push(cm)}
    );
    return data
};