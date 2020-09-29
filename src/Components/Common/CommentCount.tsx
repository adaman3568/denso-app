import React, {FC} from 'react';
import CommentIcon from '@material-ui/icons/Comment';

type props = {
    displayCount : number
}
const CommentCount : FC<props> = ({displayCount}) => {
    return (
        <div>
            <CommentIcon/>
            {displayCount}件
        </div>
    );
};

export default CommentCount;