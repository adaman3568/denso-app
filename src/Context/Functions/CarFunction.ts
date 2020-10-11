import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "../DataTypeList";
import {GetCustomer} from "./CustomerFunction";
import myFirebase, {DocumentList} from '../../Firebase';

// 全ての車両を取得する。
export const GetAllCar = async () : Promise<CarInfo[]> => {
    let data : CarInfo[] = [];
    const snapshot = await myFirebase.firestore().collection(DocumentList.Cars).get()
    snapshot.forEach(d => {
        let car : CarInfo = d.data() as CarInfo;
        car.uid = d.id;
        data.push(car)}
    );
    return data
};

// 顧客の車両を全て取得する。
export const GetCustomerCars = async (uid : string) : Promise<CarInfo[]> => {
    const db = myFirebase.firestore();
    const snapshot = await db.collection(DocumentList.Customers).doc(uid).get();
    const customer : CustomerInfo = snapshot.data() as CustomerInfo;

    if(customer.CarsRef !== undefined){
        //refデータをまとめて取得する場合は、一旦Promiseの配列にする。
        const data : Promise<CarInfo>[] = customer.CarsRef.map((item) => getCar(item));

        // その後Promise.all()に配列を投げると同時に、awaitで処理を待って、返す。
        const commentData : CarInfo[] = await Promise.all(data);
        return commentData;
    }else{
        return []
    }
};

//　refから車両を全て取得する。
const getCar = async (ref : firebase.firestore.DocumentReference) : Promise<CarInfo> => {
    const doc = await ref.get();
    const d : CarInfo = doc.data() as CarInfo;
    d.uid = doc.id;
    return d
};

// 車両を作成する。
export const CreateCar = async (parentCustomerId : string,CarName : string ,CarDetail : string) : Promise<void> => {
    const db = myFirebase.firestore()
    const carRef : firebase.firestore.DocumentReference = await db.collection(DocumentList.Cars).add({Name : CarName,Detail : CarDetail});
    let customer : CustomerInfo = await GetCustomer(parentCustomerId);
    customer.CarsRef?.push(carRef);
    db.collection(DocumentList.Customers).doc(parentCustomerId).update(customer);
};