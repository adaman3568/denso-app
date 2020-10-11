import {CarInfo, CustomerInfo} from "../DataTypeList";
import {GetCustomerFromDB} from "./CustomerFunction";
import myFirebase, {DocumentList} from '../../Firebase';

const db = myFirebase.firestore();
// 全ての車両を取得する。
export const GetAllCarFromDB = async () : Promise<CarInfo[]> => {
    let data : CarInfo[] = [];
    const snapshot = await db.collection(DocumentList.Cars).get()
    snapshot.forEach(d => {
        let car : CarInfo = d.data() as CarInfo;
        car.uid = d.id;
        data.push(car)}
    );
    return data
};

export const DeleteCarFromDB = async (uid : string) : Promise<void> => {
    await db.collection(DocumentList.Cars).doc(uid).delete()
};

// DBをUpdateしてその結果を返す。
export const UpdateCarFromDB = async (uid : string,name : string,detail : string) : Promise<CarInfo> => {
    const ref = await db.collection(DocumentList.Cars).doc(uid).get()
    const carData = ref.data() as CarInfo;
    const newCarData = {...carData,name : name,detail : detail,id : ref.id}
    await db.collection(DocumentList.Cars).doc(uid).update(newCarData);
    return newCarData
};

// 顧客の車両を全て取得する。
export const GetCustomerCarsFromDB = async (uid : string) : Promise<CarInfo[]> => {
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

// 車両を作成する。
export const CreateCarIntoDB = async (parentCustomerId : string,CarName : string ,CarDetail : string) : Promise<void> => {
    const carRef : firebase.firestore.DocumentReference = await db.collection(DocumentList.Cars).add({Name : CarName,Detail : CarDetail});
    let customer : CustomerInfo = await GetCustomerFromDB(parentCustomerId);
    customer.CarsRef?.push(carRef);
    db.collection(DocumentList.Customers).doc(parentCustomerId).update(customer);
};

//　refから車両を全て取得する。
const getCar = async (ref : firebase.firestore.DocumentReference) : Promise<CarInfo> => {
    const doc = await ref.get();
    const d : CarInfo = doc.data() as CarInfo;
    d.uid = doc.id;
    return d
};

