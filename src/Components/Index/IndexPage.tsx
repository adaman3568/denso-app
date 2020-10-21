import React, {FC, useContext} from 'react';
import {Checkbox, Fab, Fade, Grid, Modal, TextField} from "@material-ui/core";
import Tweets from "../Tweets/Tweets";
import {DataContext} from "../../Context/DataContextProvider";
import Loading from "../Common/Loading";
import {Autocomplete} from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import PostTweet from "../PostTweet";

const customer = [
    {id : 1, name : '合同会社Rst.com'},
    {id : 2, name : '株式会社タイガー'},
    {id : 3, name : '株式会社Rejoist.'},
    ]

const car = [
    {id : 1,name : "11-22"},
    {id : 2,name : "11-23"},
    {id : 3,name : "11-44"}
]

const useStyle = makeStyles((theme) => ({
    topSearch : {
        display : 'flex',
        justifyContent : 'space-between',
        padding : theme.spacing(1,2),
        width : '100%'
    },
    tweetsArea : {
        marginTop : theme.spacing(4)
    },
    floatingButton : {
        position : 'absolute',
        bottom : '10%',
        right : '10%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const IndexPage : FC = () => {

    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {loading} = useContext(DataContext);

    if(loading){
        return <Loading/>
    }

    return (
        <Grid container>
            <Fab color="primary" aria-label="add" className={classes.floatingButton} onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <div className={classes.topSearch}>
            <Autocomplete
                multiple
                id="customer-selector"
                options={customer}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="顧客検索" placeholder="顧客検索" />
                )}
            />
            <Autocomplete
                multiple
                id="car-selector"
                options={car}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="車両検索" placeholder="車両検索" />
                )}
            />
            </div>
            <Grid item sm={12} className={classes.tweetsArea}>
                <Tweets/>
            </Grid>
            {/*todo モーダルを別画面に分けたい*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <PostTweet/>
                    </div>
                </Fade>
            </Modal>
        </Grid>
    );
};

export default IndexPage;