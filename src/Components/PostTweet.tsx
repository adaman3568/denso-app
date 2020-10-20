import React from 'react';
import {Button, Checkbox, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
const customer = [
    {id : 1, name : '合同会社Rst.com'},
    {id : 2, name : '株式会社タイガー'},
    {id : 3, name : '株式会社Rejoist.'},
]

const car = [
    {id : 1,name : "11-22"},
    {id : 2,name : "11-23"},
    {id : 3,name : "11-44"}
]

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
}))

const PostTweet = () => {
    const classes = useStyle();

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        id="tweet-customer-selector"
                        options={customer}
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
                    <Autocomplete
                        id="tweet-car-selector"
                        options={car}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(option, { selected }) => (
                                <p>{option.name}</p>
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary">
                        画像投稿
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.itemCenter}>
                    <Button size={'large'} variant="contained" color="primary" className={classes.postButton}>
                        投稿
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default PostTweet;