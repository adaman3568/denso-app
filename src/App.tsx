import React from 'react';
import ImageUploader from "./ImageUploader";
import {BrowserRouter,Route,Switch} from "react-router-dom";

const App : React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={ImageUploader} path={'/'}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;

