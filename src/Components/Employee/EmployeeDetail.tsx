import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {DataContext} from "../../Context/DataContextProvider";
import {EmployeeInfo} from "../../Context/DataTypeList";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {

    const {Employee} = useContext(DataContext)
    const [emp,setEmp] = useState<EmployeeInfo>({} as EmployeeInfo);
    useEffect(() => {
        const d = Employee.Data.find(item => item.id === parseInt(match.params.id));
        if(d !== undefined)setEmp(d);
    },[])
    return (
        <div>
            <h2>this is id:{match.params.id}'s emp page.</h2>
            <p>{emp.id}</p>
            <p>{emp.CommentCount}</p>
            <p>{emp.eMail}</p>
            <p>{emp.EmpName}</p>
            <p>{emp.LastCommentDate}</p>
        </div>
    );
};

export default EmployeeDetail;