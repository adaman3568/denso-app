import React, {FC, useContext, useEffect, useState} from 'react';
import {CommentInfo, CustomerInfo} from "../../../Context/DataTypeList";
import TabPanel from "./TabPanel";
import Tweet from "../../Tweets/Tweet";
import {DataContext} from "../../../Context/DataContextProvider";
import {Grid, TextField, Typography} from "@material-ui/core";

type Props = {
    customer : CustomerInfo,
    index : number
}

const Carlist : string[] = ["全選択","11-22","11-33","11-44"]

const CustomerTabPanel : FC<Props> = ({customer,index}) => {

    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const context = useContext(DataContext);

    useEffect(() => {
        context.Comment.Func.GetCustomerCommentsFromDB(customer.id).then(res => setTweets(res));
    },[]);

    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <TabPanel index={index}>
            <Grid container>
                <Grid item xs={3}>車両検索</Grid>
                <Grid item xs={9}>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="車両選択"
                        value={currency}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="検索したい車両を選んでください。"
                    >
                        {Carlist.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
                </Grid>
            </Grid>
        </TabPanel>
    );
};

export default CustomerTabPanel;