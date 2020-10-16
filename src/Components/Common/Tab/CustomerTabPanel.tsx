import React, {FC, useContext, useState} from 'react';
import {CommentInfo, CustomerInfo} from "../../../Context/DataTypeList";
import TabPanel from "./TabPanel";
import Tweet from "../../Tweets/Tweet";
import {DataContext} from "../../../Context/DataContextProvider";

type Props = {
    customer : CustomerInfo,
    index : number
}

const CustomerTabPanel : FC<Props> = ({customer,index}) => {

    const [tweets,setTweets] = useState<CommentInfo[]>([]);
    const context = useContext(DataContext);

    return (
        <TabPanel index={index} value={customer.Name}>
            {tweets.map((item,index) => <Tweet key={index} tweet={item}/>)}
        </TabPanel>
    );
};

export default CustomerTabPanel;