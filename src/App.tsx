import React, {FC} from 'react';
import {BrowserRouter, Route, RouteComponentProps, Switch} from "react-router-dom";
import UserIndexWrapper from "./Components/UserIndex/UserIndexWrapper";
import Tweets from "./Components/Tweets/Tweets";
import {PathList} from "./Routing/path";
import ProfileIndex from "./Components/Profile/ProfileIndex";
import EmployeeIndex from "./Components/Employee/EmployeeIndex";
import CustomerIndex from "./Components/Customer/CustomerIndex";
import TweetsDetail from "./Components/Tweets/TweetsDetail";
import CustomerDetail from "./Components/Customer/CustomerDetail";
import EmployeeDetail from "./Components/Employee/EmployeeDetail";
import DataContextProvider from "./Context/DataContextProvider";
import CarIndex from "./Components/Car/CarIndex";
import CarDetail from "./Components/Car/CarDetail";
import {createMuiTheme} from "@material-ui/core";
import {pink, teal} from "@material-ui/core/colors";
import {MuiThemeProvider} from "@material-ui/core";
import PrivateRoute from "./Components/Common/Router/PrivateRoute";
import SignIn from "./Components/SignIn";
import AuthContextProvider from "./Context/AuthContextProvider";
import CarCreate from "./Components/Car/CarCreate";
import {useAuth} from "./CustomHooks";
import {CircularProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette :{
        primary : {
            dark : teal[700],
            main : teal[500],
            light : teal[300]
        },
        secondary :{
            dark : '#ffa000',
            main : '#ffc107',
            light : '#ffd54f'
        }
    }
});

const myStyle = makeStyles((theme) => ({
    margin : {
        marginTop : theme.spacing(4)
    }}))

const Loading : FC = () => {
    const classes = myStyle();
    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.margin}
        >
            <CircularProgress/>
        </Grid>
    )
};

const App : React.FC = () => {

    const {initializing,user} = useAuth();
    if(initializing){
        return <Loading/>

    }

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <DataContextProvider>
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            <UserIndexWrapper>
                                <PrivateRoute exact path={PathList.home} component={Tweets} user={user}/>
                                <PrivateRoute exact path={PathList.profile} component={ProfileIndex} user={user}/>
                                <PrivateRoute exact path={PathList.employee} component={EmployeeIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.employeeDetail}/:id`} component={EmployeeDetail} user={user}/>

                                <PrivateRoute exact path={PathList.cars} component={CarIndex} user={user}/>
                                <PrivateRoute exact path={PathList.carCreate} component={CarCreate} user={user}/>
                                <PrivateRoute exact path={`${PathList.carDetail}/:id`} component={CarDetail} user={user}/>

                                <PrivateRoute exact path={PathList.customers} component={CustomerIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.customerDetail}/:id`} component={CustomerDetail} user={user}/>

                                <PrivateRoute exact path={PathList.tweetsDetail} component={TweetsDetail} user={user}/>

                                <Route exact path={PathList.loginPage} component={SignIn} user={user}/>
                            </UserIndexWrapper>
                        </Switch>
                    </MuiThemeProvider>
                </DataContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;

