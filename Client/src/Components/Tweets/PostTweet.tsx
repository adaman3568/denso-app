import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import {CarInfo, CommentInfo, CustomerInfo} from "../../Context/DataTypeList";
import {CommentDataContext} from "../../Context/CommentDataContext";
import {CarDataContext} from "../../Context/CarDataContext";
import {CustomerDataContext} from "../../Context/CustomerDataContext";

const useStyle = makeStyles((theme) => ({
    textBox : {
        width : '100%',
        margin : theme.spacing(0,'auto')
    },
    postButton : {
        width : '60%'
    },
    itemCenter : {
        display : 'flex',
        justifyContent : 'center'
    }
}));

type Props = {
    successOpenEvent : () => void,
    failedOpenEvent : () => void
}

const PostTweetInner : FC<Props> = ({successOpenEvent,failedOpenEvent}) => {
    const classes = useStyle();

    const [cars,setCars] = useState<CarInfo[]>([]);
    const [selectedCar,setSelectedCar] = useState<CarInfo | null | undefined>(null);
    const [customers,setCustomer] = useState<CustomerInfo[]>([]);
    const [selectedCustomer,setSelectedCustomer] = useState<CustomerInfo | null | undefined>(null);
    const [commentBody , setCommentBody] = useState<string>('')

    const context = useContext(CommentDataContext);
    const carContext = useContext(CarDataContext);
    const customerContext = useContext(CustomerDataContext);

    const postTweet = () => {
        const tweet = {detail : commentBody} as CommentInfo
        try {
            context.Func.PostData(selectedCar?.id ?? 0 ,tweet);
            successOpenEvent();
        }catch (err){
            failedOpenEvent();
        }
    };

    const setCarList = (cus : CustomerInfo | null | undefined) => {
        if(cus){
            customerContext.Func.GetChildCars(cus.id).then(res => setCars(res)).catch(err => console.log(err));
        }else{
            setCars(carContext.Data);
        }
    };

    useEffect(() => {
        setCars(carContext.Data);
        setCustomer(customerContext.Data);
    },[])

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        id="tweet-customer-selector"
                        value={selectedCustomer}
                        onChange={(event: any, newValue: CustomerInfo | null | undefined) => {
                            setSelectedCustomer(newValue);
                            setCarList(newValue);
                        }}
                        options={customers}
                        getOptionLabel={(option) => option.name}
                        renderOption={(option, { selected }) => (
                                <p>{option.name}</p>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="顧客検索" placeholder="顧客検索" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        id="tweet-car-selector"
                        options={cars}
                        value={selectedCar}
                        onChange={(event: any, newValue: CarInfo | null | undefined) => {
                            setSelectedCar(newValue);
                        }}
                        getOptionLabel={(option) => option.carNo}
                        renderOption={(option, { selected }) => (
                                <p>{option.carNo}</p>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="車両検索" placeholder="車両検索" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} className={classes.itemCenter}>
                    <TextField
                        id="outlined-multiline-static"
                        label="新規投稿"
                        multiline
                        rows={8}
                        variant="outlined"
                        className={classes.textBox}
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary">
                        画像投稿
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.itemCenter}>
                    <Button size={'large'} variant="contained" color="primary" className={classes.postButton} onClick={postTweet}>
                        投稿
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

const PostTweet = (successOpen : () => void,failedOpen : () => void) => {
    return <PostTweetInner successOpenEvent={successOpen} failedOpenEvent={failedOpen}/>
}

export default PostTweet;