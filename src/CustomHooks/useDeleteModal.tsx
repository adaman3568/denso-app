import React, {ReactNode, useState} from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

function useDeleteModal<T>(ChildNode : (Data : T,func : () => void) => ReactNode){
    const [data,setData] = useState<T>({} as T);
    const [open,setOpen] = useState(false);
    const [deleteOpen,setDeleteOpen] = useState<boolean>(false);

    const DeleteOpen = () => {
        setOpen(false);
        setDeleteOpen(true)
    };

    const OpenModal = (Data : T) => {
        setData(Data);
        setOpen(true);
    };

    const Modal = () => {
        return (
            <>
                <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={ChildNode(data,DeleteOpen)}/>
                <Snackbar open={deleteOpen} autoHideDuration={6000} onClose={() => setDeleteOpen(false)}>
                    <Alert onClose={() => setDeleteOpen(false)} severity="warning">
                        データを削除しました。
                    </Alert>
                </Snackbar>
            </>
        )
    };
    return {OpenModal,Modal}
};

export default useDeleteModal