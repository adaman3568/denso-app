import React, {FC} from 'react';
import {Card, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PathList} from "../../Routing/path";
import {CommentInfo} from "../../Context/DataTypeList";
import AvatarWithName from "./ChildComponents/AvatarWithName";
import CommentBody from "./ChildComponents/CommentBody";

type props = {
    tweet : CommentInfo,
}

const useStyles = makeStyles((theme) => ({
    tweetItem : {
        marginBottom : theme.spacing(1),
        padding : theme.spacing(2)
    },
    profileWrapper : {
        padding : theme.spacing(1),
        textAlign : 'center'
    },
    image : {
        height : '75px',
        width : '75px',
        borderRadius : '50%',
        background : 'gray',
        margin : '0 auto'
    },
    timeStr : {
        paddingLeft : theme.spacing(3),
        verticalAlign : 'middle',
    },
    NonDecorationLink : {
        textDecoration : 'none'
    }})
);

const Tweet : React.FC<props> = ({tweet}) => {
    const classes = useStyles();

    return (
        <Link to={PathList.tweetsDetail} className={classes.NonDecorationLink}>
            <Card className={classes.tweetItem}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <AvatarWithName name={"TestUser"}/>
                    </Grid>
                    <Grid item xs={11}>
                        <CommentBody body={tweet.Body}/>
                    </Grid>
                </Grid>
            </Card>
        </Link>

    );
};

export default Tweet;
