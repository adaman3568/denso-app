import {makeStyles, Theme} from "@material-ui/core/styles";
import React, {FC, useContext, useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import CustomerTabPanel from "./CustomerTabPanel";
import {CustomerInfo} from "../../../Context/DataTypeList";
import {DataContext} from "../../../Context/DataContextProvider";

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const ScrollableTabsButtonAuto : FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [customers,setCustomers] = useState<CustomerInfo[]>([]);
    const context = useContext(DataContext);
    useEffect(() => {
        setCustomers(context.Customer.Data)
    });

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {customers.map((item,index) => <Tab label={item.Name} {...a11yProps(index)}/>)}
                </Tabs>
            </AppBar>
            {customers.map((item,index) => <CustomerTabPanel customer={item} index={index} key={index} />)}
        </div>
    );
}

export default ScrollableTabsButtonAuto;