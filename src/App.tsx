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
            <DataContextProvider>
                <MuiThemeProvider theme={theme}>
                    <Switch>
                        <UserIndexWrapper>
                            <Route exact path={PathList.home} component={Tweets}/>
                            <Route exact path={PathList.profile} component={ProfileIndex}/>
                            <Route exact path={PathList.employee} component={EmployeeIndex}/>
                            <Route exact path={`${PathList.employeeDetail}/:id`} component={EmployeeDetail}/>

                            <Route exact path={PathList.cars} component={CarIndex}/>
                            <Route exact path={`${PathList.carDetail}/:id`} component={CarDetail}/>

                            <Route exact path={PathList.customers} component={CustomerIndex}/>
                            <Route exact path={`${PathList.customerDetail}/:id`} component={CustomerDetail}/>

                            <Route exact path={PathList.tweetsDetail} component={TweetsDetail}/>

                        </UserIndexWrapper>
                    </Switch>
                </MuiThemeProvider>
            </DataContextProvider>
        </BrowserRouter>
    );
};

export default App;

