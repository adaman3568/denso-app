import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import {TweetDataType} from "./Tweets";
import {makeStyles} from "@material-ui/core/styles";

type props = {
    tweet : TweetDataType
}

const useStyles = makeStyles((theme) => ({
    tweetItem : {
        marginBottom : theme.spacing(1),
        padding : theme.spacing(1)
    },
    msgWrapper : {
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
    }
    })
)

const Tweet : React.FC<props> = (props : props) => {
    const classes = useStyles()
    const {tweet} = props;
    return (
        <Card className={classes.tweetItem}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Profile name={tweet.userName}/>
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.msgWrapper}>
                        {tweet.body}
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3} direction={"row"} justify={"flex-start"} alignItems={"center"}>
                <Grid item xs={10}>
                    <div className={classes.timeStr}>
                        {tweet.created}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <ParentCustomer carName={tweet.car} customerName={tweet.company}/>
                </Grid>
            </Grid>
        </Card>
    );
};

type prodfileProps = {
    name : string
}

const Profile : React.FC<prodfileProps> = (props : prodfileProps) => {
    const classes = useStyles();
    return(
        <div className={classes.profileWrapper}>
            <div className={classes.image}>
                img
            </div>
            <Typography>
                {props.name}
            </Typography>
        </div>
    )
}

type parentCustomerProps = {
    customerName : string,
    carName : string
}

const ParentCustomer : React.FC<parentCustomerProps> = (props : parentCustomerProps) => {
    return (
        <div>
            <Typography>顧客 : {props.customerName}</Typography>
            <Typography>車両 : {props.carName}</Typography>
        </div>
    )
}

export default Tweet;
