import React, {FC} from 'react';
import CustomerItem from "./CustomerItem";

export type CustomerInfo = {
    id : number
    customerName : string
    CarCount : number
    CommentCount : number
    LastCommentDate : string
    Address : string
}

const CustomerInfoList : CustomerInfo[] = [
    {id : 1,customerName : "合同会社Rst.com",CarCount : 1,CommentCount : 2,LastCommentDate : '2020/09/21 12:45:22' ,Address : "東京都世田谷区1-2-3"},
    {id : 2,customerName : "株式会社タイガー",CarCount : 5,CommentCount : 102,LastCommentDate : '2020/09/22 22:23:45',Address : "東京都世田谷区1-2-3"}
]

const CustomerIndex : FC = () => {
    return (
        <div>
            <h2>this is CustomerIndex page.</h2>
            {CustomerInfoList.map(cu => <CustomerItem key={cu.id} Customer={cu}/> )}
        </div>
    );
};

export default CustomerIndex;