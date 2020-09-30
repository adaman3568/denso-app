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
import CarDetail from "./Components/Car/CarDetail";
import CustomerDetail from "./Components/Customer/CustomerDetail";
import EmployeeDetail from "./Components/Employee/EmployeeDetail";
import DataContextProvider from "./Context/DataContextProvider";

const App : React.FC = () => {
    return (
        <BrowserRouter>
            <DataContextProvider>
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
            </DataContextProvider>
        </BrowserRouter>
    );
};

export default App;

