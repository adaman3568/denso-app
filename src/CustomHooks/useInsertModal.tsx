import React, {ReactNode, useState} from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useInsertModal = (ChildNode : (func : () => void) => ReactNode) => {
    const [open,setOpen] = useState(false);
    const [successOpen,setSuccessOpen] = useState<boolean>(false);

    const SuccessOpen = () => {
        setOpen(false)
        setSuccessOpen(true)
    };
    const insertModalOpen = () => {
        setOpen(true)
    };
    const InsertModal = () => {
        return (
            <>
                <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={ChildNode(SuccessOpen)}/>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
                    <Alert onClose={() => setSuccessOpen(false)} severity="success">
                        データを新規登録しました。
                    </Alert>
                </Snackbar>
            </>
        )
    };
    return {insertModalOpen,InsertModal}
};

export default useInsertModal