import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    center : {
        display : 'flex',
        justifyContent : 'center'
    }
}));

const CarCreate : FC = () => {
    type CustomerItem = {value : string,displayValue : string}
    const Customers : CustomerItem[] = [
        {value : '11111',displayValue : "タイガー株式会社"},
        {value : '11112',displayValue : "合同会社Rst.com"},
    ];

    const classes = useStyle();

    const [customer,setCustomer] = useState<string>('');

    const comboBoxHandleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCustomer(e.target.value)
    };

    return (
        <div>
            <h2>This is CarCreatePage.</h2>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center" spacing={3}>
                <Grid item sm={12} className={classes.center}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="得意先選択"
                        value={customer}
                        onChange={(e : ChangeEvent<HTMLInputElement>) => comboBoxHandleChange(e)}
                        helperText="車輛を紐づける得意先を選択してください。"
                        variant="outlined"
                    >
                        {Customers.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.displayValue}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item sm={12} className={classes.center}>
                    <TextField id="outlined-basic" label="車輌番号" variant="outlined" />
                </Grid>
                <Grid item sm={12} className={classes.center}>
                    <TextField
                        id="outlined-multiline-static"
                        label="備考"
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </Grid>
                <Grid item sm={12} className={classes.center}>
                    <Button variant="contained" color="primary">
                        登録
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CarCreate;