import React, {FC} from 'react';
import EmployeeItem from "./EmpItem";
import Title from "../Common/Title";

const EmployeeIndex : FC = () => {
    return (
        <div>
            <Title>This is Emp page.</Title>
            {EmpItems.map(emp => <EmployeeItem key={emp.id} Emp={emp}/>)}
        </div>
    );
};



export default EmployeeIndex;