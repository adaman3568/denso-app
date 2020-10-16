import React, {FC, useContext, useEffect, useState} from 'react';
import {CommentInfo, CustomerInfo} from "../../../Context/DataTypeList";
import TabPanel from "./TabPanel";
import Tweet from "../../Tweets/Tweet";
import {DataContext} from "../../../Context/DataContextProvider";
import {Typography} from "@material-ui/core";

type Props = {
    customer : CustomerInfo,
    index : number
}

const CustomerTabPanel : FC<Props> = ({customer,index}) => {

    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const context = useContext(DataContext);

    useEffect(() => {
        context.Comment.Func.GetCustomerCommentsFromDB(customer.id).then(res => setTweets(res));
    },[]);

    return (
        <TabPanel index={index}>
            <Typography>{customer.Name}</Typography>
            {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
        </TabPanel>
    );
};

export default CustomerTabPanel;