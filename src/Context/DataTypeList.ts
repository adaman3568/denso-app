export type RootType = {
    Emp : EmployeeInfo[],
    Customer : CustomerInfo[]
}

// EmployeeがTweetsの実態を持っていて、CustomerInfoとCarInfoはリファレンスを持っているイメージ
export type EmployeeInfo = {
    uid : string,
    Name : string,
    eMail : string,
    CommentsRef? : string[]
}

export type TweetDataType = {
    id : number,
    userName : string,
    body : string,
    created : string,
    company : string,
    car : string
}

export type CustomerInfo = {
    id : number
    customerName : string
    CarCount : number
    CommentCount : number
    LastCommentDate : string
    Address : string,
    Cars? : CarInfo[]
}

export type CarInfo = {
    id : number,
    CarName : string,
    Detail : string,
    CommentCount : number,
    LastCommentDate : string
}