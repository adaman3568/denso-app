import React, {FC} from 'react';
import {Grid} from "@material-ui/core";
import Tweets from "../Tweets/Tweets";

const IndexPage : FC = () => {
    return (
        <Grid container>
            <Grid lg={12} sm={12}>
                <Tweets/>
            </Grid>
        </Grid>
    );
};

export default IndexPage;