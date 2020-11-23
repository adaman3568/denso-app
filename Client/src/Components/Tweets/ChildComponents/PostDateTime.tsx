import React, {FC} from 'react';
import {Typography} from "@material-ui/core";

type Props = {
    postDate : Date
}

const PostDateTime : FC<Props> = ({postDate}) => {


    const renderValue = () : string => {
        if(postDate){
            const date : Date = new Date(postDate);
            const now : Date = new Date();

            const res = (now.getTime() - date.getTime())/1000;

            const lowerOneHour = 3600;
            const lowerOneDay = 86400;
            const lowerTwoDays = 172800;

            if(res < lowerOneHour) return `${parseInt((res/60).toString()) }分前`;
            if(res < lowerOneDay) return `${parseInt((res/3600).toString())}時間前`;
            if(res < lowerTwoDays) return `${parseInt((res/86400).toString())}日前`;

            return `投稿日時 : ${date.toLocaleString("ja")}`;
        }else{
            return `投稿日時　：　Null`
        }
    };




    return (
            <Typography>{renderValue()}</Typography>
    );
};

export default PostDateTime;