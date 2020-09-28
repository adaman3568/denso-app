import React, {FC} from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardTitle from "../Common/CardTitle";
import EmployeeItem from "./EmpItem";

export type EmployeeInfo = {
    id : number,
    EmpName : string,
    eMail : string,
    CommentCount : number,
    LastCommentDate : string
}

const EmpItems : EmployeeInfo[] = [
    {id : 1, EmpName : '林山　浩',eMail : 'h.hayashiyama@co-rst.com', CommentCount : 10, LastCommentDate : '2020/12/10 10:10:23'},
    {id : 2, EmpName : '池田　しんのすけ',eMail : 's.ikeda@co-rst.com', CommentCount : 12, LastCommentDate : '2020/12/8 09:08:20'},
    {id : 3, EmpName : '浅田　和則',eMail : 'k.asada@co-rst.com', CommentCount : 1400, LastCommentDate : '2020/12/11 19:22:24'}
]

const EmployeeIndex : FC = () => {
    return (
        <div>
            <h2>This is Emp page.</h2>
            {EmpItems.map(emp => <EmployeeItem key={emp.id} Emp={emp}/>)}
        </div>
    );
};



export default EmployeeIndex;