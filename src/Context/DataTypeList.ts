import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;


export type RootType = {
    Emp : EmployeeInfo[],
    Customer : CustomerInfo[]
}

// EmployeeがTweetsの実態を持っていて、CustomerInfoとCarInfoはリファレンスを持っているイメージ
export type EmployeeInfo = {
    uid : string,
    Name : string,
    eMail : string,
    CommentsRef? : DocumentReference[]
}

export type CommentInfo = {
    uid : string,
    Body : string,
    ReplyCommentRef? : DocumentReference[]
}

export type CustomerInfo = {
    uid : string
    Name : string,
    Address : string,
    CarsRef? : DocumentReference[]
}

export type CarInfo = {
    uid : string,
    Name : string,
    Detail : string,
    CommentsRef? : DocumentReference[]
}