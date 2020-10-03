import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PathList} from "../../Routing/path";
import {CommentInfo} from "../../Context/DataTypeList";

type props = {
    tweet : CommentInfo,
    ShowImg? : boolean
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
    },
    NonDecorationLink : {
        textDecoration : 'none'
    }
    })
);

const Tweet : React.FC<props> = ({tweet,ShowImg = true}) => {
    const classes = useStyles();

    const BodyWithImg = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    TestUser
                    {/*<Profile name={tweet.userName}/>*/}
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.msgWrapper}>
                        {tweet.Body}
                    </div>
                </Grid>
            </Grid>
        )
    };
    const BodyOnly = () => {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.msgWrapper}>
                        {tweet.Body}
                    </div>
                </Grid>
            </Grid>
            )
    }

    return (
        <Link to={PathList.tweetsDetail} className={classes.NonDecorationLink}>
            <Card className={classes.tweetItem}>
                {ShowImg ? <BodyWithImg/> : <BodyOnly/>}
                <Grid container spacing={3} direction={"row"} justify={"flex-start"} alignItems={"center"}>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.timeStr}>
                            {/*{tweet.created}*/}
                        </div>
                    </Grid>
                    {/*<Grid item xs={12} sm={2}>*/}
                    {/*    <ParentCustomer carName={tweet.car} customerName={tweet.company}/>*/}
                    {/*</Grid>*/}
                </Grid>
            </Card>
        </Link>

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
};

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
};

export default Tweet;
