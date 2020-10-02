import React, {useContext, useEffect, useState} from 'react';
import Tweet from "./Tweet";
import {TweetDataType} from "../../Context/DataTypeList";
import {DataContext} from "../../Context/DataContextProvider";

type Props = {
    ShowImg? : boolean
}

const Tweets : React.FC<Props> = ({ShowImg = true}) => {
    const [tweets, setTweets] = useState<TweetDataType[]>([]);
    const {Employee} = useContext(DataContext);
    useEffect(() => {
        const t = Employee.Data.flatMap(item => item.Tweets);
        const Tweets = t.filter((item) : item is Exclude<typeof item,undefined> => item !== undefined);
        setTweets(Tweets)
    },[])

    const renderItem = () => {
        return (tweets.map(item => <Tweet tweet={item} ShowImg={ShowImg}/>))
    };

    return (
        <div>
            {renderItem()}
        </div>
    );
};

export default Tweets;
