import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const  ProfesoriMenu = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                className="root"
                aria-controls="customized-menu"
                aria-haspopup="true"
                color="primary"
                onClick={handleClick}
            >
                <i className="big users icon"/>
                Profesori
                <ArrowDropDownIcon fontSize="large"/>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/studentdash/listaprof" >
                    <StyledMenuItem >
                        <ListItemIcon onClick={handleClose}>
                            <FormatListBulletedIcon fontSize="default" />
                        </ListItemIcon>
                        <ListItemText primary="Lista Profesori" onClick={handleClose} />
                    </StyledMenuItem>
                </Link>
                <Link to="/studentdash/evaluariprof">
                    <StyledMenuItem>
                        <ListItemIcon onClick={handleClose}>
                            <DoneOutlineIcon  fontSize="default" />
                        </ListItemIcon>
                        <ListItemText primary="Evaluari" onClick={handleClose} />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </div>
    );
}

export default ProfesoriMenu;
