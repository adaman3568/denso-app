import React, {FC} from "react";
import CommentIcon from "@material-ui/icons/Comment";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

type Props = {
    CommentCnt? : number
}

const useStyle = makeStyles((theme) => ({
    repCommentCnt : {
        display : 'flex',
        alignItems : 'center',
        "& p" : {
            fontSize : '1.1rem',
            marginLeft : '0.2rem'
        }
    },

    })
)

const RepCommentCnt : FC<Props> = ({CommentCnt}) => {
    const classes = useStyle();

    return (
        <div className={classes.repCommentCnt}>
            <CommentIcon color={'primary'} fontSize={'default'}/>
            <Typography>{CommentCnt}</Typography>
        </div>
    )
};

export default RepCommentCnt