import React from 'react';
import {CommentInfo} from "../../../Context/DataTypeList";
import {makeStyles} from "@material-ui/core/styles";
import CustomerAndCar from "../ChildComponents/CompanyAndCar";
import RepCommentCnt from "../RepCommentCnt";
import {Grid} from "@material-ui/core";
import AvatarWithName from "../ChildComponents/AvatarWithName";
import PostDateTime from "../ChildComponents/PostDateTime";

type CommentsProps = {
    Comment : CommentInfo,
    className? : string
}

const useStyles = makeStyles((theme) => ({
    articlePost: {
        padding: '25px 25px 10px 25px',
        maxWidth: '705px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.26)',
        margin: '0 auto'
    },
    postInner: {
        display: 'flex',
        justifyContent: 'left'
    },
    postUserImgWrapper: {
        width: '70px'
    },
    postContent: {
        marginTop: '18px',
        '& p': {
            lineHeight: '1.5rem'
        }
    },
    postUserImg: {
        height: "70px",
        width: '70px',
        borderRadius: '50%',
        background: 'aqua',
    },
    postHeader: {
        display: 'flex',
        justifyContent: 'left',
        '& p': {
            margin: '0',
            padding: '0.1rem 0.4rem',
            fontSize: '0.9rem',
        },
        '& p:first-child': {
            borderRight: '1px #808080 solid',
            paddingLeft : 0
        },
    },
    postDate: {
        paddingLeft: '0.2rem'
    },
    postBodyWrapper: {
        marginLeft: '15px'
    },
    postImages: {
        width: '100%',
        marginTop: '15px',
        borderRadius: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        '& img': {
            height: '70px',
            width: '100%',
            objectFit: 'cover',
            verticalAlign: 'bottom'
        },
        '& img:nth-child(2)': {
            height: '70px',
            width: '50%',
            objectFit: 'cover',
            verticalAlign: 'bottom',
        },
        '& img:nth-child(3)': {
            height: '70px',
            width: '50%',
            objectFit: 'cover',
            verticalAlign: 'bottom',
        },
    },
    postFooter : {
    marginTop : '8px',
    padding : '7px 10px',
    display: 'flex',
    justifyContent: 'space-between'
    },
    postRepImg :{
    height: "10px",
    width : '10px',
    background: 'aqua',
    },
    postRepCnt : {
    display: 'flex',
    justifyContent : 'center',
    alignItems : 'center',
            '& p' :{
            margin : '0 10px'
        }
    },
    footerAction : {
        '& button' : {
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                padding : '2px 15px',
                background : theme.palette.primary.main,
                color: 'white'
        }
    }
}))

const Comments : React.FC<CommentsProps> = ({Comment,className}) => {
    const classes = useStyles();

    return (
        <div className={className}>
            <article className={classes.articlePost}>
                <div className={classes.postInner}>
                    <div className={classes.postUserImgWrapper}>
                        {/*<img className={classes.postUserImg} src="img/profileimg.png"/>*/}
                        <AvatarWithName name={Comment.parentUserName}/>
                    </div>
                    <div className={classes.postBodyWrapper}>
                        <header className={classes.postHeader}>
                            <p>{Comment.parentUserName}</p>
                            <PostDateTime postDate={Comment.created}/>
                            {/*<p className={classes.postDate}>{Comment.created}</p>*/}
                        </header>
                        <div className={classes.postContent}>
                            <p>{Comment.detail}</p>
                        </div>
                    </div>
                </div>
                {/*<div className="post-images">*/}
                {/*    <img src="img/service.jpg"/>*/}
                {/*    <img src="img/service1.jpg"/>*/}
                {/*    <img src="img/service2.jpg"/>*/}
                {/*</div>*/}
                <footer className={classes.postFooter}>
                    <div className={classes.footerAction}>
                        <CustomerAndCar
                            CustomerId={Comment.parentCustomerId}
                            CustomerName={Comment.parentCustomerName}
                            CarId={Comment.parentCarId}
                            CarName={Comment.parentCarName}/>
                        {/*<button>{Comment.parentCarName}</button>*/}
                        {/*<button>{Comment.parentCustomerName}</button>*/}
                    </div>
                    <div className={classes.postRepCnt}>
                        <RepCommentCnt CommentCnt={Comment.repCommentCnt} />
                    </div>
                </footer>
            </article>
        </div>
    );
};

export default Comments;