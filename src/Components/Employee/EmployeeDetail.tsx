import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {DataContext} from "../../Context/DataContextProvider";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";
import {SetDisplayComment} from "../../Reducers/CommentReducer";
import Tweet from "../Tweets/Tweet";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {

    const {Employee,Comment,dispatch} = useContext(DataContext)
    const [emp,setEmp] = useState<EmployeeInfo>({} as EmployeeInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const d = Employee.Data.find(item => item.uid === match.params.id);
        if(d !== undefined)
        {
            setEmp(d);
            Comment.Func.GetEmpComments(d.uid).then(data => setComments(data));
        }

    },[])
    return (
        <div>
            <h2>this is id:{match.params.id}'s emp page.</h2>
            <p>{emp.uid}</p>
            <p>{emp.Name}</p>
            <p>{emp.eMail}</p>
            {comments.map((d,index) => <Tweet key={index} tweet={d}/>)}
        </div>
    );
};

export default EmployeeDetail;