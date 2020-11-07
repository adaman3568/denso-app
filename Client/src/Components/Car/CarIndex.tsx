import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo} from "../../Context/DataTypeList";
import ModalWindow from "../Common/ModalWindow";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarEdit} from "./CarCreateEdit";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "./CarDelete";

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar)

    const {Car} = useContext(DataContext)
    const [carItems,setCarItems] = useState<CarInfo[]>([]);
    useEffect(() => {
        const c : CarInfo[] = Car.Data.filter((c) : c is Exclude<typeof c,undefined> => c !== undefined);
        setCarItems(c)
    },[]);

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