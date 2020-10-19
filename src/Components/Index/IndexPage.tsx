import React, {FC, useContext} from 'react';
import {Grid} from "@material-ui/core";
import Tweets from "../Tweets/Tweets";
import {DataContext} from "../../Context/DataContextProvider";
import Loading from "../Common/Loading";

const IndexPage : FC = () => {

    const {loading} = useContext(DataContext);

    if(loading){
        return <Loading/>
    }

    return (
        <Grid container>
            <Grid item lg={12} sm={12}>
                <Tweets/>
            </Grid>
        </Grid>
    );
};

export default IndexPage;