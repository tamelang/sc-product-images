import React from "react";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        separator: {
            marginBottom: "30px"
        }
    })
);

const Separator = () => {
    const classes = useStyles();

    return (
        <div className={classes.separator} />
    )
}

export default Separator;
