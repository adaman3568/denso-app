import React, {FC, useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";

type Props = {
    value : string,
    TextBoxName : string,
    setValueFunc : (value : string) => void
}

const ParaInputChanger : FC<Props> = ({value,TextBoxName,setValueFunc}) => {

    const [isInput ,setIsInput] = useState<boolean>(false);

    return (
        <div>
            {isInput ?
                <div>
                <TextField
                id="outlined-basic"
                label={TextBoxName}
                variant="outlined"
                value={value}
                onChange={(e) => setValueFunc(e.target.value)}/>
                <Button onClick={() => setIsInput(false)}>更新</Button>
                </div>:
                <Typography onClick={() => setIsInput(true)}>{value}</Typography>}
        </div>
    );
};

export default ParaInputChanger;