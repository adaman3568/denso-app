import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import LinkCardContent from "../Common/LinkCardContent";
import {PathList} from "../../Routing/path";
import {EmployeeInfo} from "../../Context/DataTypeList";
import DeleteUpdateButton from "../Common/DeleteUpdateButton";

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

type Props = {
    Emp : EmployeeInfo
}

const EmployeeItem : FC<Props> = ({Emp}) => {
    const classes = myStyle();
    return (
        <LinkCardContent path={`${PathList.employeeDetail}/${Emp.id}`}>
            <Grid container>
                <Grid sm={12}>
                    <CardTitle>
                        {Emp.Name}
                    </CardTitle>
                </Grid>
                <Grid sm={12}>
                    <Typography variant={'h5'} className={classes.eMail}>
                        {Emp.eMail}
                    </Typography>
                </Grid>
                <DeleteUpdateButton/>
            </Grid>
        </LinkCardContent>
    )
};

export default EmployeeItem