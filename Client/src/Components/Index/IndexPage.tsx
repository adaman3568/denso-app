import React, {FC, useContext, useEffect, useState} from 'react';
import {Checkbox, Fab, Grid, TextField} from "@material-ui/core";
import Tweets from "../Tweets/Tweets";
import Loading from "../Common/Loading";
import {Autocomplete} from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import PostTweet from "../PostTweet";
import ModalWindow from "../Common/ModalWindow";
import {CarInfo, CustomerInfo} from "../../Context/DataTypeList";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";

const useStyle = makeStyles((theme) => ({
    topSearch : {
        display : 'flex',
        justifyContent : 'space-between',
        padding : theme.spacing(1,2),
        width : '100%'
    },
    tweetsArea : {
        marginTop : theme.spacing(4)
    },
    floatingButton : {
        position : 'absolute',
        bottom : '10%',
        right : '10%'
    }
}))

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const IndexPage : FC = () => {
    const [cars,setCars] = useState<CarInfo[]>([]);
    const [selectedCar,setSelectedCar] = useState<CarInfo | null | undefined>(null);
    const [customers,setCustomer] = useState<CustomerInfo[]>([]);
    const [selectedCustomer,setSelectedCustomer] = useState<CustomerInfo | null | undefined>(null);

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}cars`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CarInfo[];
                setCars(d)
            }
        );

        axios.get(`${apiEndPointBase}customers`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CustomerInfo[];
                setCustomer(d)
            }
        );
    },[]);

    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Grid container>
            <Fab color="primary" aria-label="add" className={classes.floatingButton} onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <div className={classes.topSearch}>
            <Autocomplete
                multiple
                id="customer-selector"
                options={customers}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="顧客検索" placeholder="顧客検索" />
                )}
            />
            <Autocomplete
                multiple
                id="car-selector"
                options={cars}
                disableCloseOnSelect
                getOptionLabel={(option) => option.carNo}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.carNo}
                    </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="車両検索" placeholder="車両検索" />
                )}
            />
            </div>
            <Grid item sm={12} className={classes.tweetsArea}>
                <Tweets/>
            </Grid>
            <ModalWindow IsOpen={open} handleClose={() => setOpen(false)} ChildComponent={<PostTweet/>}/>
        </Grid>
    );
};

export default IndexPage;