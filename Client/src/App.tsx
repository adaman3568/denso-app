import React, {FC, useContext} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserIndexWrapper from "./Components/UserIndexWrapper/UserIndexWrapper";
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
import {MuiThemeProvider} from "@material-ui/core";
import PrivateRoute from "./Components/Common/Router/PrivateRoute";
import SignIn from "./Components/SignIn";
import {AuthContext} from "./Context/AuthContextProvider";
import IndexPage from "./Components/Index/IndexPage";
import Loading from "./Components/Common/Loading";
import AspTestCom from "./Components/AspTestCom";

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
                                <Route exact path={"/test"} component={AspTestCom}/>
                                <PrivateRoute exact path={PathList.home} component={IndexPage} user={user}/>
                                <PrivateRoute exact path={PathList.profile} component={ProfileIndex} user={user}/>

                                <PrivateRoute exact path={PathList.employee} component={EmployeeIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.employeeDetail}/:id`} component={EmployeeDetail} user={user}/>

                                <PrivateRoute exact path={PathList.cars} component={CarIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.carDetail}/:id`} component={CarDetail} user={user}/>

                                <PrivateRoute exact path={PathList.customers} component={CustomerIndex} user={user}/>
                                <PrivateRoute exact path={`${PathList.customerDetail}/:id`} component={CustomerDetail} user={user}/>

                                <PrivateRoute exact path={`${PathList.tweetsDetail}/:id`} component={TweetsDetail} user={user}/>

                                <Route exact path={PathList.loginPage} component={SignIn} user={user}/>
                            </UserIndexWrapper>
                        </Switch>
                    </MuiThemeProvider>
                </DataContextProvider>
        </BrowserRouter>
    );
};

export default App;
