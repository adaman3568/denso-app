import React, {FC} from 'react';
import {Typography} from "@material-ui/core";

type Props = {
    value : string
}

const PostDateTime : FC<Props> = ({value}) => {

    const renderValue = () : string => {
      const dt : Date = new Date(value);
      const now : Date = new Date();

      const res = (now.getTime() - dt.getTime())/1000;

      const lowerOneHour = 3600;
      const lowerOneDay = 86400;
      const lowerTwoDays = 172800;

      if(res < lowerOneHour) return `${parseInt((res/60).toString()) }分前`;
      if(res < lowerOneDay) return `${parseInt((res/3600).toString())}時間前`;
      if(res < lowerTwoDays) return `${parseInt((res/86400).toString())}日前`;

      return `投稿日時 : ${value}`;

    };




    return (
            <Typography>{renderValue()}</Typography>
    );
};

export default PostDateTime;