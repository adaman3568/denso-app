import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {DataContext} from "../../Context/DataContextProvider";
import {EmployeeInfo} from "../../Context/DataTypeList";

type pageProps = {} & RouteComponentProps<{id : string}>

const EmployeeDetail : FC<pageProps> = ({match}) => {

    const {Employee,Comment} = useContext(DataContext)
    const [emp,setEmp] = useState<EmployeeInfo>({} as EmployeeInfo);
    useEffect(() => {
        const d = Employee.Data.find(item => item.uid === match.params.id);
        if(d !== undefined)
        {
            setEmp(d);
            Comment.Func.SetEmpComment(d.uid);
        }

    },[])
    return (
        <div>
            <h2>this is id:{match.params.id}'s emp page.</h2>
            <p>{emp.uid}</p>
            <p>{emp.Name}</p>
            <p>{emp.eMail}</p>
        </div>
    );
};

export default EmployeeDetail;