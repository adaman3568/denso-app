import React from 'react';
import ImageUploader from "./ImageUploader";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import UserIndexWrapper from "./Components/UserIndex/UserIndexWrapper";
import Tweets from "./Components/Tweets/Tweets";
import {PathList} from "./Routing/path";
import ProfileIndex from "./Components/Profile/ProfileIndex";
import EmployeeIndex from "./Components/Employee/EmployeeIndex";
import CarIndex from "./Components/Car/CarIndex";
import CustomerIndex from "./Components/Customer/CustomerIndex";
import TweetsDetail from "./Components/Tweets/TweetsDetail";

const App : React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <UserIndexWrapper>
                    <Route exact path={PathList.home} component={Tweets}/>
                    <Route exact path={PathList.profile} component={ProfileIndex}/>
                    <Route exact path={PathList.employee} component={EmployeeIndex}/>
                    <Route exact path={PathList.cars} component={CarIndex}/>
                    <Route exact path={PathList.customers} component={CustomerIndex}/>
                    <Route exact path={PathList.tweetsDetail} component={TweetsDetail}/>
                </UserIndexWrapper>
            </Switch>
        </BrowserRouter>
    );
};

export default App;

