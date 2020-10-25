import React, {FC, useContext} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserIndexWrapper from "./Components/UserIndexWrapper/UserIndexWrapper";
import Tweets from "./Components/Tweets/Tweets";
import {PathList} from "./Routing/path";
import ProfileIndex from "./Components/Profile/ProfileIndex";
import EmployeeIndex from "./Components/Employee/EmployeeIndex";
import CustomerIndex from "./Components/Customer/CustomerIndex";
import TweetsDetail from "./Components/Tweets/TweetsDetail";
import CustomerDetail from "./Components/Customer/CustomerDetail";
import EmployeeDetail from "./Components/Employee/EmployeeDetail";
import DataContextProvider, {DataContext} from "./Context/DataContextProvider";
import CarIndex from "./Components/Car/CarIndex";
import CarDetail from "./Components/Car/CarDetail";
import {createMuiTheme} from "@material-ui/core";
import {teal} from "@material-ui/core/colors";
import {MuiThemeProvider} from "@material-ui/core";
import PrivateRoute from "./Components/Common/Router/PrivateRoute";
import SignIn from "./Components/SignIn";
import CarCreate from "./Components/Car/CarCreate";
import {useAuth} from "./CustomHooks/useAuth";
import {CircularProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AuthContextProvider, {AuthContext} from "./Context/AuthContextProvider";
import IndexPage from "./Components/Index/IndexPage";
import Loading from "./Components/Common/Loading";
import AddCustomer from "./Components/Customer/AddCustomer";

const theme = createMuiTheme({
    palette :{
        primary : {
            main : '#005999'
        },
        secondary :{
            main : '#E6B745'
        },

    }
});

const App : React.FC = () => {

    const {initializing,user} = useContext(AuthContext);
    if(initializing){
        return <Loading/>
    }

    return (
        <BrowserRouter>
                <DataContextProvider>
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            <UserIndexWrapper>
                                <PrivateRoute exact path={PathList.home} component={IndexPage} user={user}/>
                                <PrivateRoute exact path={PathList.profile} component={ProfileIndex} user={user}/>

                                <PrivateRoute exact path={PathList.employee} component={EmployeeIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.employeeDetail}/:id`} component={EmployeeDetail} user={user}/>

                                <PrivateRoute exact path={PathList.cars} component={CarIndex} user={user}/>
                                <PrivateRoute exact path={PathList.carCreate} component={CarCreate} user={user}/>
                                <PrivateRoute exact path={`${PathList.carEdit}/:id`} component={CarCreate} user={user}/>
                                <PrivateRoute exact path={`${PathList.carDetail}/:id`} component={CarDetail} user={user}/>

                                <PrivateRoute exact path={PathList.customers} component={CustomerIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.customerDetail}/:id`} component={CustomerDetail} user={user}/>
                                <PrivateRoute exact path={PathList.customerCreate} component={AddCustomer} user={user}/>

                                <PrivateRoute exact path={PathList.tweetsDetail} component={TweetsDetail} user={user}/>

                                <Route exact path={PathList.loginPage} component={SignIn} user={user}/>
                            </UserIndexWrapper>
                        </Switch>
                    </MuiThemeProvider>
                </DataContextProvider>
        </BrowserRouter>
    );
};

export default App;

