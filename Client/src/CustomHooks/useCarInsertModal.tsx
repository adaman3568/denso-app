import React, {ReactNode, useState} from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {number} from "prop-types";

const useCarInsertModal = (ChildNode : (func : () => void,customerId : number | undefined) => ReactNode,customerId : number | undefined) => {
    const [open,setOpen] = useState(false);
    const [successOpen,setSuccessOpen] = useState<boolean>(false);

    const SuccessOpen = () => {
        setOpen(false)
        setSuccessOpen(true)
    };

    const OpenModal = () => {
        setOpen(true)
    };

    const Modal = () => {
        return (
            <>
                <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={ChildNode(SuccessOpen,customerId)}/>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
                <Alert onClose={() => setSuccessOpen(false)} severity="success">
                    データを新規登録しました。
                </Alert>
                </Snackbar>
            </>
    )};
    return {OpenModal,Modal}
};

export default useCarInsertModal