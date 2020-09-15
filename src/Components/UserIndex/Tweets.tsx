import React from 'react';
import Tweet from "./Tweet";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@material-ui/core/styles";

export type TweetDataType = {
    userName : string,
    body : string,
    created : string,
    company : string,
    car : string
}



const tweetDataList : TweetDataType[] = [
    {userName :'hiroshi',body : '今日はいい天気',created:'2020/09/15 11:25',company :'タイガー株式会社', car: '1195'},
    {userName :'hiroshi',body : '今日はいい天気',created:'2020/09/15 23:38',company :'タイガー株式会社', car: '1195'},
    {userName :'hiroshi',body : '今日はいい天気',created:'2020/09/15 18:11',company :'タイガー株式会社', car: '1195'},
    {userName :'hiroshi',body : '今日はいい天気',created:'2020/09/15 12:28',company :'タイガー株式会社', car: '1195'},
]

const Tweets : React.FC = () => {

    const renderItem = () => {
        return (tweetDataList.map(item => <Tweet tweet={item}/>))
    }

    return (
        <div>
            {renderItem()}
        </div>
    );
};

export default Tweets;
