import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, RouteComponentProps} from "react-router";
import {AuthContext} from "../Context/AuthContextProvider";
import Loading from "./Common/Loading";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn : React.FC<RouteComponentProps> = ({history}) => {
    const classes = useStyles();
    const [pass,setPass] = useState('');
    const [mail,setMail] = useState('');
    const {func} = useContext(AuthContext);
    const authContext = useContext(AuthContext);
    const SignIn = async () => {

            func.SignIn(mail,pass)
                .then(() => {
                history.push('/')
            }).catch((e) => console.log(e));
    };

    const renderItem = () => {
        if(authContext.isLogined){
            return (<Redirect to={'/'}/>)
        }else{
            return(<Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="パスワードを保存する"
                        />
                        {authContext.isError && <Typography component={"p"} variant="body1" >ユーザー名もしくはパスワードが違います。</Typography>}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => SignIn()}
                            // パスワードもしくはメールアドレスが空白の場合非活性にする。
                            disabled={pass === '' || mail === ''}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    パスワードをお忘れですか？
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>)
        }
    }

    {if(authContext.initializing)
        return <Loading/>}

    return renderItem();
};

export default SignIn