import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Card, CardActions, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import LinkCardContent from "../Common/LinkCardContent";
import {PathList} from "../../Routing/path";
import {EmployeeInfo} from "../../Context/DataTypeList";
import DeleteUpdateButton from "../Common/DeleteUpdateButton";
import {DataItemProps} from "../../PropsList";

const myStyle = makeStyles((theme) => ({
    card : {
        margin : theme.spacing(3),
        padding : theme.spacing(2)
    },
    empName : {
        padding : theme.spacing(2)
    },
    eMail : {
        padding : theme.spacing(2)
    }
}));

const EmployeeItem : FC<DataItemProps<EmployeeInfo>> = ({Data,EditModalOpen,DeleteModalOpen}) => {

    const classes = myStyle();
    return (
        <Card className={classes.card}>
            <LinkCardContent path={`${PathList.employeeDetail}/${Data.id}`}>
                <Grid container>
                    <Grid sm={12}>
                        <CardTitle>
                            {Data.Name}
                        </CardTitle>
                    </Grid>
                    <Grid sm={12}>
                        <Typography variant={'h5'} className={classes.eMail}>
                            {Data.eMail}
                        </Typography>
                    </Grid>
                </Grid>
            </LinkCardContent>
            <CardActions>
                <DeleteUpdateButton EditAction={() => EditModalOpen(Data)} DeleteAction={() => DeleteModalOpen(Data)}/>
            </CardActions>
        </Card>

    )
};

export default EmployeeItem