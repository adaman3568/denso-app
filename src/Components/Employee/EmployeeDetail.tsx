import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {DataContext} from "../../Context/DataContextProvider";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import {Grid} from "@material-ui/core";
import EmpProfile from "./EmpProfile";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {

    const {Employee,Comment,dispatch} = useContext(DataContext);
    const [emp,setEmp] = useState<EmployeeInfo>({} as EmployeeInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const d = Employee.Data.find(item => item.id === match.params.id);
        if(d !== undefined)
        {
            setEmp(d);
            Comment.Func.GetEmpComments(d.id).then(data => setComments(data));
        }

    },[]);

    return (
        <div>
            <EmpProfile data={emp}/>
            {comments.map((d,index) => <Tweet key={index} tweet={d}/>)}
        </div>
    );
};

export default EmployeeDetail;