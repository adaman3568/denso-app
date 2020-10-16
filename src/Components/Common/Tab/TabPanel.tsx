import React, {FC, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {TabContext} from "./TabContext";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
}

const TabPanel : FC<TabPanelProps> = ({ children, index, ...other }) => {

    const context = useContext(TabContext);

    return (
        <div
            role="tabpanel"
            hidden={context.currentIndex !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {context.currentIndex === index && (
                <Box p={3}>{children}</Box>
            )}
        </div>
    );
};

export default TabPanel