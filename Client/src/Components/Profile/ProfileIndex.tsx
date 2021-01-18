import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../Common/Title";
import firebase, {apiEndPointBase} from "../../Firebase";
import noImage from '../../img/noimage.png';
import ProfileImage from "../Common/ProfileImage";
import CommentItem from "../Tweets/V2/Comments";
import {ProfileDataContext} from "../../Context/ProfileDataContext";
import Loading from "../Common/Loading";
import {CommentInfo, EmployeeInfo} from "../../Context/DataTypeList";

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
    const [isEdit,setIsEdit] = useState<boolean>(false)

    const [imgSrc, setImgSrc] = useState<string>('https://firebasestorage.googleapis.com/v0/b/rst-denso-app.appspot.com/o/9cJIecEfqTUdFdNo0brlUO5x7NF3_profile.jpg?alt=media&token=3b76603a-d69b-4dbb-8372-d1bb6614bc03'); // firebaseの写真のソース
    const [uploadFile , setUploadFile] = useState<any>(); // firebaseクラウドに入れるデータ
    const context = useContext(ProfileDataContext)

    const [prof,setProf] = useState<EmployeeInfo>({} as EmployeeInfo)
    const [com,setCom] = useState<CommentInfo[]>([])

    const {Profile,Comments,func} = context

    useEffect(() => {
        func.GetComments();
        func.GetProfile();
    },[])

    useEffect(() => {
        setProf(Profile)
    },[Profile])

    useEffect(() => {
        setCom(Comments)
    },[Comments])


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
        return `${Profile.uid}_profile.jpg`
    };

    if(Profile === undefined)
        return <Loading/>

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
                            <Typography variant={"h6"} onClick={() => setIsEdit(true)}>
                                登録名 :
                                {prof.name}
                            </Typography> :
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
                        <Typography>コメント数：{prof.commentCnt}件</Typography>
                    </Grid>
                    <Grid item xs={12}
                          direction={"row"}
                          className={classes.flexCenter}>
                        <Typography>最終コメント日付：{new Date(prof.lastCommentDate).toLocaleString("ja")}</Typography>
                    </Grid>
                </Grid>
            </Card>
            {com.map((com,index) => <CommentItem key={index} Comment={com}/>)}
        </Container>
    );
};

export default ProfileIndex;