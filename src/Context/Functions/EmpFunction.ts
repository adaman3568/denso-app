import {EmployeeInfo} from "../DataTypeList";
import firebase, {DocumentList} from '../../Firebase';

const db = firebase.firestore();

// 全ての従業員を取得する。
export const GetAllEmployeesFromDB = async () : Promise<EmployeeInfo[]> => {
    let data : EmployeeInfo[] = [];
    const snapshot = await db.collection(DocumentList.Employees).get()
    snapshot.forEach(d => {
        let em : EmployeeInfo = d.data() as EmployeeInfo;
        em.id = d.id;
        data.push(em)}
        );
    return data
};