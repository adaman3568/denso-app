import {CustomerInfo} from "../DataTypeList";
import firebase from '../../Firebase';

export const GetAllCustomer = async () : Promise<CustomerInfo[]> => {
    let data : CustomerInfo[] = [];
    const snapshot = await firebase.firestore().collection('Employees').get()
    snapshot.forEach(d => {
        let cus : CustomerInfo = d.data() as CustomerInfo;
        cus.uid = d.id;
        data.push(cus)}
    );
    return data
};