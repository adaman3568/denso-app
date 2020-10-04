import {CustomerInfo} from "../DataTypeList";
import firebase, {DocumentList} from '../../Firebase';

export const GetAllCustomers = async () : Promise<CustomerInfo[]> => {
    let data : CustomerInfo[] = [];
    const snapshot = await firebase.firestore().collection(DocumentList.Customers).get()
    snapshot.forEach(d => {
        let cus : CustomerInfo = d.data() as CustomerInfo;
        cus.uid = d.id;
        data.push(cus)}
    );
    return data
};