import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DataContext} from "../../Context/DataContextProvider";

const useStyle = makeStyles((theme) => ({
    center : {
        display : 'flex',
        justifyContent : 'center'
    }
}));

const CarCreate : FC = () => {
    type DisplayCustomerItem = {value : string,displayValue : string}

    const {Customer,Car} = useContext(DataContext)

    useEffect(() => {
        const cus : DisplayCustomerItem[] = Customer.Data.map(item => ({value : item.uid,displayValue : item.Name}));
        setDisplayCustomers(cus)
    },[])

    const classes = useStyle();

    const [displayCustomers,setDisplayCustomers] = useState<DisplayCustomerItem[]>([]);
    const [selectedCustomer,setSelectedCustomer] = useState<string>('');
    const [carNumber,setCarNumber] = useState<string>('');
    const [carDetail,setCarDetail] = useState<string>('');

    const comboBoxHandleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setSelectedCustomer(e.target.value)
    };

    const CreateCar = async () => {
        await Car.Func.CreateCar(selectedCustomer,carNumber,carDetail)
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
                        value={selectedCustomer}
                        onChange={(e : ChangeEvent<HTMLInputElement>) => comboBoxHandleChange(e)}
                        helperText="車輛を紐づける得意先を選択してください。"
                        variant="outlined"
                    >
                        {displayCustomers.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.displayValue}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item sm={12} className={classes.center}>
                    <TextField id="outlined-basic" label="車輌番号" variant="outlined" value={carNumber} onChange={(e) => setCarNumber(e.target.value)}/>
                </Grid>
                <Grid item sm={12} className={classes.center}>
                    <TextField
                        id="outlined-multiline-static"
                        label="備考"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={carDetail}
                        onChange={(e) => setCarDetail(e.target.value)}
                    />
                </Grid>
                <Grid item sm={12} className={classes.center}>
                    <Button variant="contained" color="primary" type={'button'} onClick={() => CreateCar()}>
                        登録
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CarCreate;