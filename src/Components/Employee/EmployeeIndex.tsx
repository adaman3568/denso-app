import React, {FC, useContext, useEffect, useState} from 'react';
import EmployeeItem from "./EmpItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";
import {EmployeeInfo} from "../../Context/DataTypeList";

const EmployeeIndex : FC = () => {
    const {EmpFunc} = useContext(DataContext)
    const [empData , setEmpData] = useState<EmployeeInfo[]>([]);
    useEffect(() => {
        setEmpData(EmpFunc.GetAllEmpData())
    },[])
    return (
        <div>
            <Title>This is Emp page.</Title>
            {empData.map(emp => <EmployeeItem key={emp.id} Emp={emp}/>)}
        </div>
    );
};



export default EmployeeIndex;