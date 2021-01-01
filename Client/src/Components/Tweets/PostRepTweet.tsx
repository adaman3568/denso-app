import React, {FC, useContext, useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CommentInfo} from "../../Context/DataTypeList";
import {CommentDataContext} from "../../Context/CommentDataContext";

const useStyle = makeStyles((theme) => ({
    textBox : {
        width : '100%',
        margin : theme.spacing(0,'auto')
    },
    postButton : {
        width : '60%'
    },
    itemCenter : {
        display : 'flex',
        justifyContent : 'center'
    }
}));

type Props = {
    successOpenEvent : () => void,
    failedOpenEvent : () => void,
    parentCommentID : number
}

const PostTweetInner : FC<Props> = ({successOpenEvent,failedOpenEvent,parentCommentID}) => {
    const classes = useStyle();
    const [commentBody , setCommentBody] = useState<string>('')

    const context = useContext(CommentDataContext);

    const postTweet = () => {
        const tweet = {detail : commentBody} as CommentInfo
        try {
            context.Func.PostRep(parentCommentID,tweet);
            successOpenEvent();
        }catch (err){
            failedOpenEvent();
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.itemCenter}>
                    <TextField
                        id="outlined-multiline-static"
                        label="返信コメント"
                        multiline
                        rows={8}
                        variant="outlined"
                        className={classes.textBox}
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary">
                        画像投稿
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.itemCenter}>
                    <Button size={'large'} variant="contained" color="primary" className={classes.postButton} onClick={postTweet}>
                        投稿
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

const PostRepTweet = (successOpen : () => void,failedOpen : () => void,parentCommentID : number) => {
    return <PostTweetInner successOpenEvent={successOpen} failedOpenEvent={failedOpen} parentCommentID={parentCommentID}/>
};

export default PostRepTweet;