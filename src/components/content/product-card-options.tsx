import * as React from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import { ListItemText } from "@mui/material";
import { Download, Save } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            float: "right"
        },
        menuIcon: {
            color: "black",
            marginRight: '5%'
        },
        menuLink: {
            color: "black"
        },
    })
);

const ProductCardOptions = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.button}>
            <Button
                id="basic-button"
                style={{
                    color: "black"
                }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                Options
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Download className={classes.menuIcon}/>
                    <ListItemText primary="Download" className={classes.menuLink}/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Save className={classes.menuIcon}/>
                    <ListItemText primary="Pin" className={classes.menuLink}/>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ProductCardOptions;
