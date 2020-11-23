import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import {Grid} from "@material-ui/core";
import EmpProfile from "./EmpProfile";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {

    const [emp,setEmp] = useState<EmployeeInfo>({} as EmployeeInfo);
    const [comments, setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}users/${match.params.id}`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as EmployeeInfo;
                setEmp(d)
            }
        );

        axios.get(`${apiEndPointBase}users/${match.params.id}/comments`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                    console.log(res);
                const d = res.data as CommentInfo[];
                setComments(d)
            }
        );
    },[])

    return (
        <div>
            <EmpProfile data={emp}/>
            {comments.map((d,index) => <Tweet key={index} tweet={d}/>)}
        </div>
    );
};

export default EmployeeDetail;