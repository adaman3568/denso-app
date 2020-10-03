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
    uid : string,
    Body : string,
    ReplyCommentRef : string[]
}

export type CustomerInfo = {
    uid : string
    Name : string,
    Address : string,
    CarsRef : string[]
}

export type CarInfo = {
    uid : number,
    Name : string,
    Detail : string,
    CommentsRef : string[]
}