import React, {FC} from 'react';
import {Card, CardActionArea, CardActions, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PathList} from "../../Routing/path";
import {CarInfo, CommentInfo, CustomerInfo} from "../../Context/DataTypeList";
import AvatarWithName from "./ChildComponents/AvatarWithName";
import CommentBody from "./ChildComponents/CommentBody";
import CustomerAndCar from "./ChildComponents/CompanyAndCar";
import PostDateTime from "./ChildComponents/PostDateTime";

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

const Tweet : FC<props> = ({tweet}) => {
    const classes = useStyles();

    console.log(tweet)

    return (
        <Link to={`${PathList.tweetsDetail}/${tweet?.id}`} className={classes.NonDecorationLink}>
            <Card className={classes.tweetItem}>
                <CardActionArea>
                    <Grid container spacing={3}>
                        <Grid item xs={1}>
                            <AvatarWithName name={tweet.parentUserName}/>
                        </Grid>
                        <Grid item xs={11}>
                            <Grid item xs={12}>
                                <PostDateTime postDate={tweet.created}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CommentBody body={tweet?.detail}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <CardActions>
                    {/*<CustomerAndCar Customer={testCustomer} Car={testCar}/>*/}
                </CardActions>
            </Card>
        </Link>

    );
};

export default Tweet;
