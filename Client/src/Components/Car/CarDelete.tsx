import {CarInfo, CommentInfo} from "../../Context/DataTypeList";
import React, {FC} from "react";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";
import Cookies from "js-cookie";

type props = {
    Car : CarInfo,
    deleteConfirmOpen : () => void
}

const useStyle = makeStyles((theme) => ({
    textCenter : {
        textAlign : 'center'
    }
}));

const CarDelete : FC<props> = ({Car,deleteConfirmOpen}) => {
    const classes = useStyle();

    const deleteCar = () => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.delete(`${apiEndPointBase}cars/${Car.id}`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                    alert("車両を削除しました。")
                    console.log(res)
            }
        ).catch(err => {
            alert("車両を削除しました。")
            console.log(err)
        });
        deleteConfirmOpen();
    }

    return (
        <div className={classes.textCenter}>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>車両名：{Car.carNo}</Typography>
            </div>
            <div className={classes.textCenter}>
                <Typography display={'inline'} variant={'h3'}>詳細：{Car.detail}</Typography>
            </div>
            <div className={classes.textCenter}>
                上記車両を本当に削除しますか？<br/>
                付随するコメントも全て削除されます。
            </div>
            <div className={classes.textCenter}>
                <Button variant={'contained'} color={'primary'} onClick={deleteCar}>削除</Button>
            </div>
        </div>
    )
};

export const DeleteCar = (Data : CarInfo,deleteOpenEvent : () => void) => {
    return <CarDelete Car={Data} deleteConfirmOpen={deleteOpenEvent}/>
};
