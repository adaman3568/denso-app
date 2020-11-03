import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Button, ButtonGroup, Card, CardActions, Grid, Typography} from "@material-ui/core";
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
    editModalOpen : (emp : EmployeeInfo) => void,
    deleteModalOpen : (emp : EmployeeInfo) => void
}

const EmployeeItem : FC<Props> = ({Emp,editModalOpen,deleteModalOpen}) => {

    const editAction = () => {
        editModalOpen(Emp)
    };

    const deleteAction = () => {
        deleteModalOpen(Emp)
    };

    const classes = myStyle();
    return (
        <Card className={classes.card}>
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
                </Grid>
            </LinkCardContent>
            <CardActions>
                <DeleteUpdateButton EditAction={editAction} DeleteAction={deleteAction}/>
            </CardActions>
        </Card>

    )
};

export default EmployeeItem