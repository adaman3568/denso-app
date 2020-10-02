import React, {FC, useContext} from 'react';
import EmployeeItem from "./EmpItem";
import Title from "../Common/Title";
import {DataContext} from "../../Context/DataContextProvider";

const EmployeeIndex : FC = () => {
    const {Employee} = useContext(DataContext);
    return (
        <div>
            <Title>This is Emp page.</Title>
            {Employee.Data.map(emp => <EmployeeItem key={emp.id} Emp={emp}/>)}
        </div>
    );
};



export default EmployeeIndex;