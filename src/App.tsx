import React from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
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

const App : React.FC = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <DataContextProvider>
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            <UserIndexWrapper>
                                <PrivateRoute exact path={PathList.home} component={Tweets}/>
                                <PrivateRoute exact path={PathList.profile} component={ProfileIndex}/>
                                <PrivateRoute exact path={PathList.employee} component={EmployeeIndex}/>
                                <PrivateRoute exact path={`${PathList.employeeDetail}/:id`} component={EmployeeDetail}/>

                                <PrivateRoute exact path={PathList.cars} component={CarIndex}/>
                                <PrivateRoute exact path={`${PathList.carDetail}/:id`} component={CarDetail}/>

                                <PrivateRoute exact path={PathList.customers} component={CustomerIndex}/>
                                <PrivateRoute exact path={`${PathList.customerDetail}/:id`} component={CustomerDetail}/>

                                <PrivateRoute exact path={PathList.tweetsDetail} component={TweetsDetail}/>

                                <Route exact path={PathList.loginPage} component={SignIn}/>
                            </UserIndexWrapper>
                        </Switch>
                    </MuiThemeProvider>
                </DataContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
};

export default App;

