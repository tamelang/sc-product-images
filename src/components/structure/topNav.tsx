import React from "react";
import {
    AppBar,
    Avatar,
    Button,
    CardHeader,
    Divider,
    Grid,
    InputAdornment,
    ListItemText,
    TextField,
    Toolbar
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Colors } from "../../enums/colors";
import {
    ContactMail,
    Flag,
    Person,
    Search,
    Store,
    Token
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import SteelcaseLogo from '../../static/steelcase.png'


const useStyles = makeStyles(() =>
    createStyles({
        header: {
            backgroundColor: Colors.IBM_IX_BLACK
        },
        headerLink: {
            color: "white",
            marginLeft: "30px !important",
            fontSize: "30px !important",
            fontWeight: "bold!important"
        },
        regions: {
            backgroundColor: "#0e1111",
            padding: "0.3%"
        },
        adminUi: {
            float: "right",
        },
        adminUiText: {
            color: "white"
        },
        grow: {
            flexGrow: 1,
            anchor: "top"
        },
        notifications: {
            paddingRight: 20
        },
        navigation: {
          backgroundColor: Colors.IBM_IX_BLACK,
            paddingLeft: "1.5%"
        },
        menuIcon: {
            color: "white",
            marginRight: '10px'
        },
        menuLink: {
            color: "white",
            fontSize: "30px !important",
        },
        firstMenuLink: {
            color: "white",
            fontSize: "30px !important",
            fontWeight: "bold !important"
        },
        searchField: {
            float: 'right',
            backgroundColor: '#D9D9D9',
        },
        searchContainer: {
            padding: "1%"
        }
    })
);

const TopNav = () => {
    const classes = useStyles();

    return(
        <AppBar position="static" className={classes.header}>
            <Toolbar disableGutters>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.regions}>
                            <Grid container xs={12} sm={12} spacing={4} direction="row">
                                <Grid item xs={4} sm={4}>
                                    <Button>
                                        <Flag className={classes.menuIcon}/>
                                        <ListItemText primary="America (English)" className={classes.menuLink}/>
                                    </Button>
                                    <Button>
                                        <ContactMail className={classes.menuIcon}/>
                                        <ListItemText primary="Contact" className={classes.menuLink}/>
                                    </Button>
                                    <Button>
                                        <Person className={classes.menuIcon}/>
                                        <ListItemText primary="Dealer" className={classes.menuLink}/>
                                    </Button>
                                    <Button>
                                        <Store className={classes.menuIcon}/>
                                        <ListItemText primary="Store" className={classes.menuLink}/>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6}/>
                                <Grid item xs={2} sm={2}>
                                    <Button className={classes.adminUi} component={Link} to="/ims-token">
                                        <Token className={classes.menuIcon}/>
                                        <ListItemText primary="IMS Token" className={classes.menuLink}/>
                                    </Button>
                                    <Button className={classes.adminUi}>
                                        <ListItemText primary="Log In" className={classes.adminUiText} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button component={Link} to="/">
                            <CardHeader
                                avatar={<Avatar sx={{ height: '80px', width: '280px', bgcolor: "black" }} variant="rounded" color="white" src={SteelcaseLogo} />}
                                title={""}
                                subheader={""}
                            />
                        </Button>
                        <div className={classes.grow} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.navigation}>
                            <Divider />
                            <Grid container xs={12} sm={12} rowSpacing={4} direction="row">
                                <Grid item xs={8} sm={8}>
                                    <Button>
                                        <ListItemText primary="New" className={classes.firstMenuLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="Products" className={classes.headerLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="Ancillary Collection" className={classes.headerLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="Spaces" className={classes.headerLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="Design Resources" className={classes.headerLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="Research" className={classes.headerLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="About" className={classes.headerLink}/>
                                    </Button>
                                    <Button>
                                        <ListItemText primary="Dealer Community" className={classes.headerLink}/>
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={4} className={classes.searchContainer}>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                        className={classes.searchField}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default TopNav;
