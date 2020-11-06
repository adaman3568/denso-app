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

const testCustomer : CustomerInfo = {
    id : 'test',
    Name : '合同会社Rst.com',
    Address : '東京都',
    CarsRef : []
}

const testCar : CarInfo = {
    id : 'text',
    Name : '11-69',
    CommentsRef : [],
    Detail : 'デジタコ・ETC装着'
}

const Tweet : FC<props> = ({tweet}) => {
    const classes = useStyles();

    return (
        <Link to={`${PathList.tweetsDetail}/${tweet?.id}`} className={classes.NonDecorationLink}>
            <Card className={classes.tweetItem}>
                <CardActionArea>
                    <Grid container spacing={3}>
                        <Grid item xs={1}>
                            <AvatarWithName name={"TestUser"}/>
                        </Grid>
                        <Grid item xs={11}>
                            <Grid item xs={12}>
                                <PostDateTime value={'2020/10/19 22:50'}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CommentBody body={tweet?.Body}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <CardActions>
                    <CustomerAndCar Customer={testCustomer} Car={testCar}/>
                </CardActions>
            </Card>
        </Link>

    );
};

export default Tweet;
