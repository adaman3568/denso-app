import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {CarInfo, CommentInfo, CustomerInfo} from "../../Context/DataTypeList";
import CarItem from "../Car/CarItem";
import {
    AppBar,
    Box, Button, Grid,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Tweet from "../Tweets/Tweet";
import CarCreateEdit, {CarCreate, CarEdit} from "../Car/CarCreateEdit";
import useInsertModal from "../../CustomHooks/useInsertModal";
import useEditModal from "../../CustomHooks/useEditModal";
import useDeleteModal from "../../CustomHooks/useDeleteModal";
import {DeleteCar} from "../Car/CarDelete";
import Cookies from "js-cookie";
import axios from "axios";
import {apiEndPointBase} from "../../Firebase";
import useCarInsertModal from "../../CustomHooks/useCarInsertModal";


type pageProps = {} & RouteComponentProps<
    {
        id : string
    }>

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        margin : theme.spacing(2)
    },
    tabRoot : {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width : '100%'
    },
    map : {
        width : '90%'
    },
    customerContent : {
        display : 'flex',
        justifyContent : 'center',
        marginBottom : theme.spacing(3)
    }
}));

const CustomerDetail : FC<pageProps> = ({match}) => {
    const [customer , setCustomer] = useState<CustomerInfo>({} as CustomerInfo);
    const [cars , setCars] = useState<CarInfo[]>([]);
    const [comments , setComments] = useState<CommentInfo[]>([]);

    useEffect(() => {
        const token = Cookies.get("denso-app-jwt-token");
        axios.get(`${apiEndPointBase}customers/${match.params.id}`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CustomerInfo;
                setCustomer(d)
            }
        );

        axios.get(`${apiEndPointBase}customers/${match.params.id}/comments`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CommentInfo[];
                setComments(d);
            }
        );

        axios.get(`${apiEndPointBase}customers/${match.params.id}/cars`,{headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }}).then(res => {
                const d = res.data as CarInfo[];
                setCars(d);
            }
        );
    },[])

    const insertModal = useCarInsertModal(CarCreate,parseInt(match.params.id));

    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Grid item xs={12} className={classes.customerContent}>
                    <h2>{customer.name}</h2>
                </Grid>
                <Grid item xs={12} className={classes.customerContent}>
                    <p>住所：{customer.address}</p>
                </Grid>
                <Grid item xs={12} className={classes.customerContent}>
                    <iframe className={classes.map} src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.2308567825557!2d139.75543315077263!3d35.69593623667565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c115d3f353b%3A0xbbe47de65abe4872!2z56We5L-d55S66aeF!5e0!3m2!1sja!2sjp!4v1602851875701!5m2!1sja!2sjp"}
                            height={"450"} frameBorder={"0"} aria-hidden={"false"}/>
                </Grid>
                <Grid item xs={12}>
                    {/*この辺で顧客コードの投げ方を考えないといけない。。。*/}
                    <Button onClick={insertModal.OpenModal} variant={'contained'} color={'primary'}>車両追加</Button>
                </Grid>
            </Grid>
            <NavTabs displayCars={cars} displayComments={comments}/>
            {insertModal.Modal()}
        </div>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel1(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

interface LinkTabProps {
    label?: string;
    href?: string;
}

type Props = {
    displayCars : CarInfo[],
    displayComments : CommentInfo[]
}

const NavTabs : FC<Props> = ({displayCars,displayComments}) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const carEditModal = useEditModal<CarInfo>(CarEdit);
    const carDeleteModal = useDeleteModal<CarInfo>(DeleteCar);

    return (
        <div className={classes.tabRoot}>
            <AppBar position="static" color={"default"}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <Tab label="車両一覧" {...a11yProps(0)} />
                    <Tab label="コメント一覧" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel1 value={value} index={0}>
                {displayCars.map((item,index) => <CarItem key={index} Data={item} EditModalOpen={carEditModal.OpenModal} DeleteModalOpen={carDeleteModal.OpenModal}/>)}
                {carEditModal.Modal()}
                {carDeleteModal.Modal()}
            </TabPanel1>
            <TabPanel1 value={value} index={1}>
                {displayComments.map((item,index) => <Tweet key={index} tweet={item}/>)}
            </TabPanel1>
        </div>
    );
}

export default CustomerDetail;