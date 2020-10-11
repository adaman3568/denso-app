import React, {FC, useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    value : string,
    TextBoxName : string,
    setValueFunc : (value : string) => void
}

const useStyle = makeStyles((theme) => ({
    margin : {
        marginTop : theme.spacing(2)
    }
}));

const ParaInputChanger : FC<Props> = ({value,TextBoxName,setValueFunc}) => {

    const [isInput ,setIsInput] = useState<boolean>(false);

    const classes = useStyle();

    const Input = () => {
        return (
            <>
                <TextField
                    id="outlined-basic"
                    label={TextBoxName}
                    variant="outlined"
                    value={value}
                    onChange={(e) => setValueFunc(e.target.value)}/>
                <Button onClick={() => setIsInput(false)}>更新</Button>
            </>
        )
    };
    const Text = () => {
        return(<Typography onClick={() => setIsInput(true)}>{TextBoxName} : {value}</Typography>)
    };

    return (
        <div className={classes.margin}>
            {isInput ? <Input/> :  <Text/>}
        </div>
    );
};

export default ParaInputChanger;