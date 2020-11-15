import React, {FC, useContext, useEffect, useState} from 'react';
import {CommentInfo, CustomerInfo} from "../../../Context/DataTypeList";
import TabPanel from "./TabPanel";
import Tweet from "../../Tweets/Tweet";
import {DataContext} from "../../../Context/DataContextProvider";
import {Grid, TextField, Typography} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

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

    const [value, setValue] = React.useState<string | null>(Carlist[0]);

    return (
        <TabPanel index={index}>
            <Grid container>
                <Grid item xs={3}>車両検索</Grid>
                <Grid item xs={9}>
                    <Autocomplete
                        id="combo-box-car-search"
                        value={value}
                        onChange={(event: any, newValue: string | null) => {setValue(newValue)}}
                        options={Carlist}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="車両選択" variant="outlined"
                        />}
                    />
                </Grid>
                <Grid item xs={12}>
                    {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
                </Grid>
            </Grid>
        </TabPanel>
    );
};

export default CustomerTabPanel;