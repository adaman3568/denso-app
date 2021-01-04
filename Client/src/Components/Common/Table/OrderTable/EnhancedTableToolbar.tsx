import {createStyles, lighten, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import React, {FC} from "react";

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const isSelected : boolean = numSelected > 0;

    const Icon : FC = () => {
        const DeleteIcon = () => {
            return (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>)
        };
        const FilterdIcon = () => {
            return (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )
        };

        { return isSelected ? <DeleteIcon/> : <FilterdIcon/>}

    };
    const InfoTypo : FC = () => {
        const SelectedTypo = () => {
            return (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>)
        };
        const NonSelected = () => {
            return (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Nutrition
                </Typography>
            )
        };

        {return isSelected ? <SelectedTypo/> : <NonSelected/>}
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: isSelected,
            })}
        >
            <InfoTypo/>
            <Icon/>
        </Toolbar>
    );
};

