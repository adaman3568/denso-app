import React, {ReactNode, useState} from "react";
import ModalWindow from "../Components/Common/ModalWindow";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useInsertRepModal = (ChildNode : (successFunc : () => void,failedFunc : () => void,parentCommentID : number) => ReactNode,parentCommentID : number) => {
    const [open,setOpen] = useState(false);
    const [successOpen,setSuccessOpen] = useState<boolean>(false);
    const [failedOpen,setFailedOpen] = useState<boolean>(false);

    const SuccessOpen = () => {
        setOpen(false)
        setSuccessOpen(true)
    };

    const FailedOpen = () => {
        setOpen(false);
        setFailedOpen(true)
    };

    const OpenModal = () => {
        setOpen(true)
    };

    const Modal = () => {
        return (
            <>
                <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={ChildNode(SuccessOpen,FailedOpen,parentCommentID)}/>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
                    <Alert onClose={() => setSuccessOpen(false)} severity="success">
                        データを新規登録しました。
                    </Alert>
                </Snackbar>
                <Snackbar open={failedOpen} autoHideDuration={6000} onClose={() => setFailedOpen(false)}>
                    <Alert onClose={() => setFailedOpen(false)} severity="warning">
                        データの登録に失敗しました。
                    </Alert>
                </Snackbar>
            </>
        )
    };
    return {OpenModal,Modal}
};

export default useInsertRepModal