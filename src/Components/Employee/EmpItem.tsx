import {makeStyles} from "@material-ui/core/styles";
import React, {FC} from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import CardTitle from "../Common/CardTitle";
import {EmployeeInfo} from "./EmployeeIndex";
import CommentCount from "../Common/CommentCount";

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
        <Card className={classes.card}>
            <Grid container>
                <Grid sm={12}>
                    <CardTitle>
                        {Emp.EmpName}
                    </CardTitle>
                </Grid>
                <Grid sm={12}>
                    <Typography variant={'h5'} className={classes.eMail}>
                        {Emp.eMail}
                    </Typography>
                </Grid>
                <Grid sm={6}>
                    <CommentCount displayCount={Emp.CommentCount}/>
                </Grid>
                <Grid sm={6}>
                    最終コメント日付：{Emp.LastCommentDate}
                </Grid>
            </Grid>
        </Card>
    )
};

export default EmployeeItem