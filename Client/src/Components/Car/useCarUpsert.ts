import {CarInfo} from "../../Context/DataTypeList";
import {ChangeEvent, useState} from "react";

type carUpsertProps = {
    carNo : string,
    detail : string,
    releaseYear : number,
    maker : string,
    carType : string
}

export const useCarUpsert = (car : CarInfo | undefined) => {
    const [carData,setCarData] = useState<carUpsertProps>(
        {carNo : car?.carNo ?? ''
            ,releaseYear : parseInt(car?.releaseYear.toString() ?? '0')
            ,carType : car?.carType ?? ''
            ,maker : car?.maker ?? ''
            ,detail : car?.detail ?? ''});
    const isEdit = car !== undefined;

    return {props : {
        carName : {value : carData.carNo,onChange : (e : ChangeEvent<HTMLInputElement>) => setCarData({...carData,carNo: e.target.value})},
        carType : {value : carData.carType,onChange : (e : ChangeEvent<HTMLInputElement>) => setCarData({...carData,carType: e.target.value})},
        carDetail : {value : carData.detail,onChange : (e : ChangeEvent<HTMLInputElement>)  => setCarData({...carData,detail: e.target.value})},
        carMaker : {value : carData.maker,onChange : (e : ChangeEvent<HTMLInputElement>)  => setCarData({...carData,maker: e.target.value})},
        carReleaseYear : {value : carData.releaseYear.toString(),handleChange : (v : string) => setCarData({...carData,releaseYear: parseInt(v)})}
    },
        Data : isEdit ? {...car,...carData} as CarInfo : carData as CarInfo,
        isEdit}
};