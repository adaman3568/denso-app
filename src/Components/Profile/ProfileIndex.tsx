import React, {FC, useState} from 'react';
import {Button, Card, Container, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Tweets from "../Tweets/Tweets";

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

const ProfileIndex : React.FC = () => {
    const classes = myStyle();

    const [isEdit,setIsEdit] = useState<boolean>(false)

    return (
        <Container>
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
                            <Typography onClick={() => setIsEdit(true)}>登録名 : 林山　浩</Typography> :
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
                </Grid>
            </Card>
            <Tweets ShowImg={false}/>
        </Container>


    );
};

export default ProfileIndex;