import React, {FC} from 'react';
import Title from "../Common/Title";
import {CommentInfo} from "../../Context/DataTypeList";
import Tweet from "./Tweet";
import {RouteComponentProps} from "react-router-dom";

type pageProps = {} & RouteComponentProps<{id : string}>

const TweetsDetail : FC<pageProps> = ({match}) => {

    // この辺でcustomHooks使ってデータ取得して表示するようにする。

    return (
        <div>
            {console.log(match.params.id)}
            <p>{match.params.id}</p>
        </div>
    );
};

export default TweetsDetail;