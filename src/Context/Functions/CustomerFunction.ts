import {CustomerInfo} from "../DataTypeList";

const CustomerInfoList : CustomerInfo[] = [
    {id : 1,customerName : "合同会社Rst.com",CarCount : 1,CommentCount : 2,LastCommentDate : '2020/09/21 12:45:22' ,Address : "東京都世田谷区1-2-3"},
    {id : 2,customerName : "株式会社タイガー",CarCount : 5,CommentCount : 102,LastCommentDate : '2020/09/22 22:23:45',Address : "東京都世田谷区1-2-3"}
]

export const GetAllCustomerData = () : CustomerInfo[] => {
    return CustomerInfoList
};

export const GetCustomerData = (id : number) : CustomerInfo | undefined => {
    return CustomerInfoList.find(item => item.id === id);
};