import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {CarInfo} from "../../Context/DataTypeList";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarEdit} from "./CarCreateEdit";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "./CarDelete";
import Loading from "../Common/Loading";
import {CarDataContext} from "../../Context/CarDataContext";

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar)
    const {Data,isLoading} = useContext(CarDataContext)

    if(isLoading)
        return <Loading/>

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {Data.map(car => <CarItem key={car.id} Data={car} DeleteModalOpen={carDeleteModal.OpenModal} EditModalOpen={carEditModal.OpenModal}/>)}
            {carEditModal.Modal()}
            {carDeleteModal.Modal()}
        </div>
    );
};

export default CarIndex;

export {}