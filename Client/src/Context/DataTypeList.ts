// EmployeeがTweetsの実態を持っていて、CustomerInfoとCarInfoはリファレンスを持っているイメージ
export type EmployeeInfo = {
    id : number,
    uid : string,
    name : string,
    created : Date,
    updated : Date,
    parentCompanyId : number
    commentCnt : number,
    lastCommentDate : Date,
    mail : string
}

export type CommentInfo = {
    id: number,
    detail: string,
    created: Date,
    updated?: Date,
    parentCarId: number,
    userId: number,
    parentCommentId?: number,
    repCommentCnt: number,
    lastRepCommentDate :Date,
    parentUserName : string,
    parentCarName : string
    parentCustomerId : number
    parentCustomerName : string
}

export type CustomerInfo = {
    id : number
    name : string
    detail : string
    address : string
    created : Date
    updated : Date
    parentCompanyId : number
    commentCnt : number
    lastCommentDate : Date
}

export type CarInfo = {
    id? : number
    carNo : string
    detail : string
    carType? : string
    maker? : string
    releaseYear : number
    created? : Date
    updated? : Date
    parentCustomerId? : number
    commentCnt? : number
    lastCommentDate? : Date
}