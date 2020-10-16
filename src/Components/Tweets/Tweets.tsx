import React, {useContext, useEffect, useState} from 'react';
import Tweet from "./Tweet";
import {DataContext} from "../../Context/DataContextProvider";
import ScrollableTabsButtonAuto from "../Common/Tab/ScrollableTabsButtonAuto";
import TabContextProvider from "../Common/Tab/TabContext";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {
    const {Comment} = useContext(DataContext);
    return (
        <div>
            <TabContextProvider>
                <ScrollableTabsButtonAuto/>
            </TabContextProvider>
            <h2>Tweets</h2>
            {Comment.Data.map((item,index) => <Tweet key={index} tweet={item} ShowImg={ShowImg}/>)}
        </div>
    );
};

export default Tweets;
