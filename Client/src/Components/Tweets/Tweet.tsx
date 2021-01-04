import React, {FC} from 'react';
import {Card, CardActionArea, CardActions, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PathList} from "../../Routing/path";
import {CommentInfo} from "../../Context/DataTypeList";
import AvatarWithName from "./ChildComponents/AvatarWithName";
import CommentBody from "./ChildComponents/CommentBody";
import CustomerAndCar from "./ChildComponents/CompanyAndCar";
import PostDateTime from "./ChildComponents/PostDateTime";
import RepCommentCnt from "./RepCommentCnt";
import useInsertRepModal from "../../CustomHooks/useRepInsertModal";
import PostRepTweet from "./PostRepTweet";

type props = {
    tweet : CommentInfo,
    showAction? : boolean;
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
        textDecoration : 'none',
        color : 'black'
    }})
);

const Tweet : FC<props> = ({tweet,showAction = true}) => {
    const classes = useStyles();
    const modal = useInsertRepModal(PostRepTweet,tweet.id);

    return (

            <Card className={classes.tweetItem}>
                <Link to={`${PathList.tweetsDetail}/${tweet?.id}`} className={classes.NonDecorationLink}>
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
                </Link>
                <CardActions>
                    <Grid container>
                        <Grid item xs={3}>
                            {/*会社名とか車両番号とか表示する*/}
                            {showAction &&
                            <CustomerAndCar
                                CustomerId={tweet.parentCustomerId}
                                CustomerName={tweet.parentCustomerName}
                                CarId={tweet.parentCarId}
                                CarName={tweet.parentCarName}/>
                            }
                        </Grid>
                        <Grid item xs={9} onClick={modal.OpenModal}>
                            <RepCommentCnt CommentCnt={tweet.repCommentCnt} />
                        </Grid>
                    </Grid>
                </CardActions>
                {modal.Modal()}
            </Card>
    );
};

export default Tweet;
