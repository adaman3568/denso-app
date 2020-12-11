import React, {FC} from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    prefex : string
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=''
        />
    );
}

interface IProps {
    value : string,
    handleChange : (value : string) => void
    label : string
    className : string
}


const NumberInput : FC<IProps> = ({value,handleChange,label,className}) => {
    return (
            <TextField
                className={className}
                label={label}
                value={value}
                onChange={e => handleChange(e.target.value)}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                }}
            />
    );
};

export default NumberInput