import React from 'react';
import ImageUploader from "./ImageUploader";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import UserIndexWrapper from "./Components/UserIndex/UserIndexWrapper";
import Tweets from "./Components/Tweets/Tweets";

const App : React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <UserIndexWrapper>
                    <Route exact path={`/`} component={Tweets}/>
                    <Route exact path={`/imguploader`} component={ImageUploader}/>
                </UserIndexWrapper>
            </Switch>
        </BrowserRouter>
    );
};

export default App;

