import React, {FC, useContext, useEffect, useState} from 'react';
import EmployeeItem from "./EmployeeItem";
import Title from "../Common/Title";
import Loading from "../Common/Loading";
import {EmpDataContext} from "../../Context/EmpDataContext";

const EmployeeIndex : FC = () => {

    const {Data,isLoading} = useContext(EmpDataContext)

    if(isLoading)
        return <Loading/>

    return (
        <div>
            <Title>This is Emp page.</Title>
            {Data.map((emp,index) => <EmployeeItem key={index} Data={emp}/>)}
        </div>
    );
};



export default EmployeeIndex;