import React, {FC} from 'react';
import {Fab, Grid} from "@material-ui/core";
import Tweets from "../Tweets/Tweets";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import PostTweet from "../Tweets/PostTweet";
import useInsertModal from "../../CustomHooks/useInsertModal";

const useStyle = makeStyles((theme) => ({
    topSearch : {
        display : 'flex',
        justifyContent : 'space-between',
        padding : theme.spacing(1,2),
        width : '100%'
    },
    tweetsArea : {
        marginTop : theme.spacing(4)
    },
    floatingButton : {
        position : 'absolute',
        bottom : '10%',
        right : '10%'
    }
}))

const IndexPage : FC = () => {

    const insertModal = useInsertModal(PostTweet);
    const classes = useStyle();

    return (
        <Grid container>
            <Fab color="primary" aria-label="add" className={classes.floatingButton} onClick={insertModal.OpenModal}>
                <AddIcon />
            </Fab>
            <Grid item sm={12} className={classes.tweetsArea}>
                <Tweets/>
            </Grid>
            {insertModal.Modal()}
        </Grid>
    );
};

export default IndexPage;