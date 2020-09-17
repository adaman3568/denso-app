import React from 'react';
import ImageUploader from "./ImageUploader";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import UserIndexWrapper from "./Components/UserIndex/UserIndexWrapper";
import Tweets from "./Components/Tweets/Tweets";
import {PathList} from "./Routing/path";
import Profile from "./Components/Profile/Profile";

const App : React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <UserIndexWrapper>
                    <Route exact path={PathList.home} component={Tweets}/>
                    <Route exact path={PathList.profile} component={Profile}/>
                </UserIndexWrapper>
            </Switch>
        </BrowserRouter>
    );
};

export default App;

