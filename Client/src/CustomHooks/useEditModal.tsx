import React, {ReactNode, useState} from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

function useEditModal<T>(ChildNode : (Data : T, successOpen : () => void,failedOpen : () => void) => ReactNode){
    const [open,setOpen] = useState(false);
    const [customer, setCustomer] = useState<T>({} as T);
    const [successOpen,setSuccessOpen] = useState<boolean>(false);
    const [failedOpen,setFailedOpen] = useState<boolean>(false);

    const SuccessOpen = () => {
        setOpen(false);
        setSuccessOpen(true)
    };

    const FailedOpen = () => {
        setOpen(false);
        setFailedOpen(true)
    };

    const OpenModal = (Data : T) => {
        setCustomer(Data);
        setOpen(true)
    };

    const Modal = () => {
        return (
            <>
                <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={ChildNode(customer,SuccessOpen,FailedOpen)}/>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
                    <Alert onClose={() => setSuccessOpen(false)} severity="success">
                        データの編集が完了しました。
                    </Alert>
                </Snackbar>
                <Snackbar open={failedOpen} autoHideDuration={6000} onClose={() => setFailedOpen(false)}>
                    <Alert onClose={() => setFailedOpen(false)} severity="warning">
                        データの編集に失敗しました。
                    </Alert>
                </Snackbar>
            </>
        )
    };
    return {Modal,OpenModal}
};

export default useEditModal