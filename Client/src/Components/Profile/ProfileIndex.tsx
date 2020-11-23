import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Container, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../Common/Title";
import Cookies from "js-cookie";
import {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";

const myStyle = makeStyles((theme) => ({
    dummyImg :{
        height : '150px',
        width : '150px',
        borderRadius : '50%',
        backgroundColor : 'gray'
    },
    card : {
        padding : theme.spacing(3),
        marginBottom : theme.spacing(5)
    },
    center : {
        margin : '0 auto'
    },
    flexCenter : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    }

}));

const ProfileIndex : FC = () => {
    const classes = myStyle();

    const [profile,setProfile] = useState<EmployeeInfo>({} as EmployeeInfo);
    const [comments,setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const jwtToken = Cookies.get("denso-app-jwt-token");
        const profileApiPath = `${apiEndPointBase}profile/myprofile`;
        axios.get(profileApiPath,{
            headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${jwtToken}`
                }}).then(res => {
                    const prof = res.data as EmployeeInfo;
                    console.log(prof);
                    setProfile(prof);
        });

        const commentsApiPath = `${apiEndPointBase}profile/mycomments`
        axios.get(commentsApiPath,{
            headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${jwtToken}`
                }}).then(res => {
            const com = res.data as CommentInfo[];
            setComments(com);
        });
    },[]);
    const [isEdit,setIsEdit] = useState<boolean>(false)

    return (
        <Container>
            <Title>this is profile page.</Title>
            <Card className={classes.card}>
                <Grid container
                      spacing={3}
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                >
                    <Grid item xs={12} className={classes.flexCenter}>
                        <div className={classes.dummyImg}>img</div>
                    </Grid>
                    <Grid item xs={12}
                          direction="row"
                          className={classes.flexCenter}>
                        {!isEdit ?
                            <Typography onClick={() => setIsEdit(true)}>登録名 : {profile.name}</Typography> :
                            <div className={classes.flexCenter}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="登録名"
                                    defaultValue="林山　浩"
                                    variant="outlined"
                                />
                                <Button onClick={() => setIsEdit(false)}>登録</Button>
                            </div>
                        }
                        <p>コメント数：{profile.commentCnt}</p>
                        <p>最終コメント日付：{profile.lastCommentDate}</p>
                    </Grid>
                </Grid>
            </Card>
            {comments.map(com => <Tweet tweet={com}/>)}
        </Container>
    );
};

export default ProfileIndex;