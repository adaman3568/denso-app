import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, Card, Container, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../Common/Title";
import Cookies from "js-cookie";
import firebase, {apiEndPointBase} from "../../Firebase";
import axios from "axios";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";
import Tweet from "../Tweets/Tweet";
import noImage from '../../img/noimage.png';
import ProfileImage from "../Common/ProfileImage";

const myStyle = makeStyles((theme) => ({
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
        margin: 0
    }

}));

const ProfileIndex : FC = () => {
    const classes = myStyle();

    const [profile,setProfile] = useState<EmployeeInfo>({} as EmployeeInfo);
    const [comments,setComments] = useState<CommentInfo[]>([]);
    const [isEdit,setIsEdit] = useState<boolean>(false)

    const [imgSrc, setImgSrc] = useState<string>('https://firebasestorage.googleapis.com/v0/b/rst-denso-app.appspot.com/o/9cJIecEfqTUdFdNo0brlUO5x7NF3_profile.jpg?alt=media&token=3b76603a-d69b-4dbb-8372-d1bb6614bc03'); // firebaseの写真のソース
    const [uploadFile , setUploadFile] = useState<any>(); // firebaseクラウドに入れるデータ

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

    useEffect(() => {
        // setImgSrc(profile.imgSourcePath)
    },[])

    const handleChangeFile = (e : ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file : File = (target.files as FileList)[0];
        const item = URL.createObjectURL(file); // 画像の一時的なパス
        setImgSrc(item); // 画像の一時的なパスを指定して、imgタグで表示する。
        setUploadFile(file); // uploadするファイルに入れる
    };

    const sendItem = () => {
        const ref = firebase.storage().ref();
        const fileName = GetFileName();
        const uploadRef = ref.child(fileName);
        uploadRef.put(uploadFile).then((snapshot) => {
            snapshot.ref.getDownloadURL()
                .then((url) => {
                    setImgSrc(url);
                    console.log(url)
                })
                .catch((err)=>{console.log(err)})
        })
    };

    const GetFileName = () => {
        return `${profile.uid}_profile.jpg`
    };

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
                        <ProfileImage imageSource={imgSrc}/>
                        <input type={'file'} accept={'image/*'} onChange={(e) => handleChangeFile(e)}/>
                        <button type="button" onClick={() => sendItem()}>投稿する</button>
                    </Grid>
                    <Grid item xs={12}
                          direction="row"
                          className={classes.flexCenter}>
                        {!isEdit ?
                            <Typography variant={"h6"} onClick={() => setIsEdit(true)}>登録名 : {profile.name}</Typography> :
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

                    </Grid>
                    <Grid item xs={12}
                          direction={"row"}
                          className={classes.flexCenter}>
                        <Typography>コメント数：{profile.commentCnt}件</Typography>
                    </Grid>
                    <Grid item xs={12}
                          direction={"row"}
                          className={classes.flexCenter}>
                        <Typography>最終コメント日付：{new Date(profile.lastCommentDate).toLocaleString("ja")}</Typography>
                    </Grid>
                </Grid>
            </Card>
            {comments.map(com => <Tweet tweet={com}/>)}
        </Container>
    );
};

export default ProfileIndex;