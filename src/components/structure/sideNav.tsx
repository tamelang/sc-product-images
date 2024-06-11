import React from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import {
    ArrowForwardIos,
    ImageSearch,
    DataArray,
    Token
} from "@mui/icons-material";
import { Colors } from "../../enums/colors";

const useStyles = makeStyles((theme) =>
    createStyles({
        menu: {
            width: '100%',
            height: '100%',
            backgroundColor: Colors.IBM_IX_BLACK,
            position: "relative",
        },
        menuIcon: {
            color: "white",
            marginRight: '10%'
        },
        menuLink: {
            color: "white"
        },
        divider: {
            backgroundColor: "white"
        }
    })
);

const SideNav: React.FC = () => {
    const classes = useStyles();

    return (
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.menu}>
            <ListItem component={Link} to="/product-listing">
                <ImageSearch className={classes.menuIcon}/>
                <ListItemText primary="Product Listing" className={classes.menuLink}/>
                <ArrowForwardIos className={classes.menuIcon}/>
            </ListItem>
            <Divider className={classes.divider}/>
            <ListItem component={Link} to="/asset-metadata">
                <DataArray className={classes.menuIcon}/>
                <ListItemText primary="Fetch Asset Metadata" className={classes.menuLink}/>
                <ArrowForwardIos className={classes.menuIcon}/>
            </ListItem>
            <Divider className={classes.divider}/>
            <ListItem component={Link} to="/ims-token">
                <Token className={classes.menuIcon}/>
                <ListItemText primary="IMS Token" className={classes.menuLink}/>
                <ArrowForwardIos className={classes.menuIcon}/>
            </ListItem>
            <Divider className={classes.divider}/>
        </List>
    );
}

export default SideNav;
