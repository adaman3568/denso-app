import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import {CarInfo, CommentInfo, CustomerInfo} from "../Context/DataTypeList";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../Firebase";

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

const PostTweet = () => {
    const classes = useStyle();

    const [cars,setCars] = useState<CarInfo[]>([]);
    const [selectedCar,setSelectedCar] = useState<CarInfo | null | undefined>(null);
    const [customers,setCustomer] = useState<CustomerInfo[]>([]);
    const [selectedCustomer,setSelectedCustomer] = useState<CustomerInfo | null | undefined>(null);
    const [commentBody , setCommentBody] = useState<string>('')

    const postTweet = () => {
        const tweet = {detail : commentBody}
        const token = Cookies.get("denso-app-jwt-token");
        axios.post(`${apiEndPointBase}comments/${selectedCar?.id}`,tweet,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res =>
                {
                    alert("コメントを追加しました。");
                    console.log(res)
                }
                ).catch(err =>
                {
                    alert("コメントを追加しました。");
                    console.log(err)
                });
    };

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
    },[])

    //todo 顧客追加ボタンを作る
    //todo 車両追加ボタンを作る
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/*Todo この辺で何故か顧客が閉じない*/}
                    <Autocomplete
                        id="tweet-customer-selector"
                        value={selectedCustomer}
                        onChange={(event: any, newValue: CustomerInfo | null | undefined) => {
                            setSelectedCustomer(newValue);
                        }}
                        options={customers}
                        disableCloseOnSelect
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
                    {/*Todo この辺で何故か車両が閉じない*/}
                    {/*Todo 顧客が変更されたら車両も変更されるようにする。*/}
                    <Autocomplete
                        id="tweet-car-selector"
                        options={cars}
                        disableCloseOnSelect
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

export default PostTweet;