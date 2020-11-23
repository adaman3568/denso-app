import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import {Grid} from "@material-ui/core";
import EmpProfile from "./EmpProfile";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {

    const [emp,setEmp] = useState<EmployeeInfo>({} as EmployeeInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    return (
        <div>
            <EmpProfile data={emp}/>
            {comments.map((d,index) => <Tweet key={index} tweet={d}/>)}
        </div>
    );
};

export default EmployeeDetail;