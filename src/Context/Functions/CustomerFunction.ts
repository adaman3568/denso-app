import {CustomerInfo} from "../DataTypeList";
import firebase, {DocumentList} from '../../Firebase';

const db = firebase.firestore();

// 全ての顧客を取得する
export const GetAllCustomersFromDB = async () : Promise<CustomerInfo[]> => {
    let data : CustomerInfo[] = [];
    const snapshot = await db.collection(DocumentList.Customers).get();
    snapshot.forEach(d => {
        let cus : CustomerInfo = d.data() as CustomerInfo;
        cus.uid = d.id;
        data.push(cus)}
    );
    return data
};

// 特定の顧客を取得する。
export const GetCustomerFromDB = async (id : string) : Promise<CustomerInfo> => {
    const snapshot = await db.collection(DocumentList.Customers).doc(id).get();
    const d = snapshot.data()
    let data = DataToCustomerInfo(snapshot.data())
    data.uid = snapshot.id;
    return data;
};

const DataToCustomerInfo = (data : any) : CustomerInfo => {
    return data as CustomerInfo
}