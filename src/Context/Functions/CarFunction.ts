import {CarInfo} from "../DataTypeList";
import firebase from '../../Firebase';

export const GetAllCar = async () : Promise<CarInfo[]> => {
    let data : CarInfo[] = [];
    const snapshot = await firebase.firestore().collection('Cars').get()
    snapshot.forEach(d => {
        let car : CarInfo = d.data() as CarInfo;
        car.uid = d.id;
        data.push(car)}
    );
    return data
};