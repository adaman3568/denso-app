import React, {FC, useContext, useEffect, useState} from 'react';
import Title from "../Common/Title";
import CarItem from "./CarItem";
import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import ModalWindow from "../Common/ModalWindow";
import useEditModal from "../../CustomHooks/useEditModal";
import {CarEdit} from "./CarCreateEdit";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "./CarDelete";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar)

    const [carItems,setCarItems] = useState<CarInfo[]>([]);

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}cars`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CarInfo[];
                setCarItems(d)
            }
        );
    })

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