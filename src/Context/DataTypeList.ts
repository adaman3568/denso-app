import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;


export type RootType = {
    Emp : EmployeeInfo[],
    Customer : CustomerInfo[]
}

// EmployeeがTweetsの実態を持っていて、CustomerInfoとCarInfoはリファレンスを持っているイメージ
export type EmployeeInfo = {
    id : string,
    Name : string,
    eMail : string,
    CommentsRef? : DocumentReference[]
}

export type CommentInfo = {
    id : string,
    Body : string,
    ReplyCommentRef? : DocumentReference[]
}

export type CustomerInfo = {
    id : string
    Name : string,
    Address : string,
    CarsRef? : DocumentReference[]
}

export type CarInfo = {
    id : string,
    Name : string,
    Detail : string,
    CommentsRef? : DocumentReference[]
}