import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarEdit} from "./CarCreateEdit";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "./CarDelete";
import {DataContext} from "../../Context/DataContext";
import Loading from "../Common/Loading";

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar)
    const {Car,isLoading} = useContext(DataContext)

    const [carItems,setCarItems] = useState<CarInfo[]>(Car.Data);
    useEffect(() => {
        setCarItems(Car.Data)
    },[Car.Data])

    if(isLoading)
        return <Loading/>

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {carItems.map(car => <CarItem key={car.id} Data={car} DeleteModalOpen={carDeleteModal.OpenModal} EditModalOpen={carEditModal.OpenModal}/>)}
            {carEditModal.Modal()}
            {carDeleteModal.Modal()}
        </div>
    );
};


export default CarIndex;

export {}