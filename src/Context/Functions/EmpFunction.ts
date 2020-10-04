import {EmployeeInfo} from "../DataTypeList";
import firebase, {DocumentList} from '../../Firebase';

export const GetAllEmployees = async () : Promise<EmployeeInfo[]> => {
    let data : EmployeeInfo[] = [];
    const snapshot = await firebase.firestore().collection(DocumentList.Employees).get()
    snapshot.forEach(d => {
        let em : EmployeeInfo = d.data() as EmployeeInfo;
        em.uid = d.id;
        data.push(em)}
        );
    return data
};