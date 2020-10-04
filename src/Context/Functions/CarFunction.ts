import {CarInfo, CommentInfo, CustomerInfo, EmployeeInfo} from "../DataTypeList";
import firebase, {DocumentList} from '../../Firebase';

export const GetAllCar = async () : Promise<CarInfo[]> => {
    let data : CarInfo[] = [];
    const snapshot = await firebase.firestore().collection(DocumentList.Cars).get()
    snapshot.forEach(d => {
        let car : CarInfo = d.data() as CarInfo;
        car.uid = d.id;
        data.push(car)}
    );
    return data
};

export const GetCustomerCars = async (uid : string) : Promise<CarInfo[]> => {
    const db = firebase.firestore();
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

const getCar = async (ref : firebase.firestore.DocumentReference) : Promise<CarInfo> => {
    const doc = await ref.get();
    const d : CarInfo = doc.data() as CarInfo;
    d.uid = doc.id;
    return d
};