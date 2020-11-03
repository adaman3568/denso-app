import React, {ReactNode, useState} from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

function useEditModal<T>(ChildNode : (Data : T, func : () => void) => ReactNode){
    const [open,setOpen] = useState(false);
    const [customer, setCustomer] = useState<T>({} as T);
    const [successOpen,setSuccessOpen] = useState<boolean>(false);
    const setData = setCustomer;

    const SuccessOpen = () => {
        setOpen(false)
        setSuccessOpen(true)
    };

    const editModalOpen = () => {
        setOpen(true)
    };

    const EditModal = () => {
        return (
            <>
                <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={ChildNode(customer,SuccessOpen)}/>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
                    <Alert onClose={() => setSuccessOpen(false)} severity="success">
                        データの編集が完了しました。
                    </Alert>
                </Snackbar>
            </>
        )
    };
    return {editModalOpen,EditModal,setData}
};

export default useEditModal