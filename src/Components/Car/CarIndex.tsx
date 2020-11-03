import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";
import ModalWindow from "../Common/ModalWindow";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarEdit} from "./CarCreateFromCustomer";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "./CarDelete";

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar)

    const editEvent = (Car : CarInfo) => {
        carEditModal.setData(Car)
        carEditModal.editModalOpen();
    };

    const deleteEvent = (Car : CarInfo) => {
        carDeleteModal.setData(Car)
        carDeleteModal.modalOpen();
    };


    const {Car} = useContext(DataContext)
    const [carItems,setCarItems] = useState<CarInfo[]>([]);
    useEffect(() => {
        const c : CarInfo[] = Car.Data.filter((c) : c is Exclude<typeof c,undefined> => c !== undefined);
        setCarItems(c)
    },[]);

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            {carItems.map(car => <CarItem key={car.id} Car={car} deleteModalOpen={deleteEvent} editModalOpen={editEvent} />)}
            {carEditModal.EditModal()}
            {carDeleteModal.Modal()}
        </div>
    );
};


export default CarIndex;

export {}