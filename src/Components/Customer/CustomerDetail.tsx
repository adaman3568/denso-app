import React, {FC, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {DataContext} from "../../Context/DataContextProvider";
import {CarInfo, CustomerInfo} from "../../Context/DataTypeList";
import CarItem from "../Car/CarItem";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
}));

const CustomerDetail : FC<pageProps> = ({match}) => {
    const {Customer,Car} = useContext(DataContext);
    const [customer , setCustomer] = useState<CustomerInfo>({} as CustomerInfo);
    const [cars , setCars] = useState<CarInfo[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const c = Customer.Data.find(item => item.id === match.params.id);
        if (c){
            setCustomer(c);
            Car.Func.GetCustomerCars(match.params.id).then(d => setCars(d))
        }
    },[]);

    return (
        <div>
            <h2>{customer.Name}</h2>
            <p>住所：{customer.Address}</p>
            <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.2308567825557!2d139.75543315077263!3d35.69593623667565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c115d3f353b%3A0xbbe47de65abe4872!2z56We5L-d55S66aeF!5e0!3m2!1sja!2sjp!4v1602851875701!5m2!1sja!2sjp"}
                width={"600"} height={"450"} frameBorder={"0"} aria-hidden={"false"}/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>車両一覧</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {cars?.map((item,index) => <CarItem key={index} Car={item}/>)}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>コメント一覧</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>コメントリストが入ります</Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
};

export default CustomerDetail;