import {EmployeeInfo} from "../DataTypeList";
import firebase from '../../Firebase';

export const GetAllEmp = async () : Promise<EmployeeInfo[]> => {
    let data : EmployeeInfo[] = [];
    const snapshot = await firebase.firestore().collection('Employees').get()
    snapshot.forEach(d => {
        let em : EmployeeInfo = d.data() as EmployeeInfo;
        em.uid = d.id;
        data.push(em)}
        );
    return data
};