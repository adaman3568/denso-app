import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import {CarInfo} from "../../Context/DataTypeList";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarEdit} from "./CarCreateEdit";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "./CarDelete";
import Loading from "../Common/Loading";
import {CarDataContext} from "../../Context/CarDataContext";
import MasterBaseTable, {
    createColumnInfo,
    DeleteModalOpenFunctionType,
    EditModalOpenFunctionType
} from "../Common/MasterBaseTable";

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar);
    const {Data,isLoading} = useContext(CarDataContext);
    const [carList ,setCarList] = useState<CarInfo[]>([]);

    useEffect(() => {
        setCarList(Data)
    },[Data]);

    const displayColumn = [
        createColumnInfo('carNo',"車両名"),
        createColumnInfo('releaseYear',"年式"),
        createColumnInfo('carType',"型式"),
        createColumnInfo('maker',"メーカー"),
        createColumnInfo('commentCnt',"コメント数"),
    ]

    if(isLoading)
        return <Loading/>;

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            <MasterBaseTable
                ColumnInfoList={displayColumn}
                Data={carList}
                OpenModal={carEditModal.OpenModal as EditModalOpenFunctionType}
                DeleteModal={carDeleteModal.OpenModal as DeleteModalOpenFunctionType}/>
            {carEditModal.Modal()}
            {carDeleteModal.Modal()}
        </div>
    );
};

export default CarIndex;

export {}