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
import CustomTable from "../Common/CustomTable";
import {Button, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    button : {
        margin : theme.spacing(1)
    }
}));

const CarIndex : FC = () => {
    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar);
    const {Data,isLoading} = useContext(CarDataContext);
    const [carList ,setCarList] = useState<CarInfo[]>([]);

    const classes = useStyle();

    useEffect(() => {
        setCarList(Data)
    },[Data]);

    if(isLoading)
        return <Loading/>;

    return (
        <div>
            <Title>This is CarIndex page.</Title>
            <CustomTable>
                <TableHead>
                    <TableRow>
                        <TableCell>車両名</TableCell>
                        <TableCell>初度登録年月</TableCell>
                        <TableCell>型式</TableCell>
                        <TableCell>メーカー</TableCell>
                        <TableCell>詳細</TableCell>
                        <TableCell>コメント数</TableCell>
                        <TableCell>管理</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carList.map((car,index) => (
                        <TableRow>
                            <TableCell>{car.carNo}</TableCell>
                            <TableCell>{car.releaseYear}</TableCell>
                            <TableCell>{car.carType}</TableCell>
                            <TableCell>{car.maker}</TableCell>
                            <TableCell>{car.detail}</TableCell>
                            <TableCell>{car.commentCnt}</TableCell>
                            <TableCell>
                                <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => carDeleteModal.OpenModal(car)}>削除</Button>
                                <Button className={classes.button} size={'small'} color={"primary"} variant="contained"  onClick={() => carEditModal.OpenModal(car)}>編集</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </CustomTable>
            {carEditModal.Modal()}
            {carDeleteModal.Modal()}
        </div>
    );
};

export default CarIndex;

export {}