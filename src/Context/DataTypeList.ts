export type RootType = {
    Emp : EmployeeInfo[],
    Customer : CustomerInfo[]
}

export type EmployeeInfo = {
    id : number,
    EmpName : string,
    eMail : string,
    CommentCount : number,
    LastCommentDate : string
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