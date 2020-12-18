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
import CarIndex from "./Components/Car/CarIndex";
import CarDetail from "./Components/Car/CarDetail";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core";
import PrivateRoute from "./Components/Common/Router/PrivateRoute";
import SignIn from "./Components/SignIn";
import {AuthContext} from "./Context/AuthContextProvider";
import IndexPage from "./Components/Index/IndexPage";
import Loading from "./Components/Common/Loading";
import DataContextProvider from "./Context/DataContext";
import {CommentDataContextProvider} from "./Context/CommentDataContext";
import {CustomerDataContextProvider} from "./Context/CustomerDataContext";
import {CarDataContext, CarDataContextProvider} from "./Context/CarDataContext";

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

    const {initializing,isLogined} = useContext(AuthContext);
    if(initializing){
        return <Loading/>
    }

    const DataContextWrapper : React.FC = ({children}) => {
        return (
            <MuiThemeProvider theme={theme}>
                <DataContextProvider>
                    <CustomerDataContextProvider>
                        <CommentDataContextProvider>
                            <CarDataContextProvider>
                                {children}
                            </CarDataContextProvider>
                        </CommentDataContextProvider>
                    </CustomerDataContextProvider>
                </DataContextProvider>
            </MuiThemeProvider>
        )
    }

    return (
        <BrowserRouter>
            <DataContextWrapper>
                    <Switch>
                        <UserIndexWrapper>
                            <PrivateRoute exact path={PathList.home} component={IndexPage} isLogin={isLogined}/>
                            <PrivateRoute exact path={PathList.profile} component={ProfileIndex} isLogin={isLogined}/>

                            <PrivateRoute exact path={PathList.employee} component={EmployeeIndex} isLogin={isLogined}/>
                            <PrivateRoute exact path={`${PathList.employeeDetail}/:id`} component={EmployeeDetail} isLogin={isLogined}/>

                            <PrivateRoute exact path={PathList.cars} component={CarIndex} isLogin={isLogined}/>
                            <PrivateRoute exact path={`${PathList.carDetail}/:id`} component={CarDetail} isLogin={isLogined}/>

                            <PrivateRoute exact path={PathList.customers} component={CustomerIndex} isLogin={isLogined}/>
                            <PrivateRoute exact path={`${PathList.customerDetail}/:id`} component={CustomerDetail} isLogin={isLogined}/>

                            <PrivateRoute exact path={`${PathList.tweetsDetail}/:id`} component={TweetsDetail} isLogin={isLogined}/>

                            <Route exact path={PathList.loginPage} component={SignIn} isLogin={isLogined}/>
                        </UserIndexWrapper>
                    </Switch>
            </DataContextWrapper>
        </BrowserRouter>
    );
};

export default App;

