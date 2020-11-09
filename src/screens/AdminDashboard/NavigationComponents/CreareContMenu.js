import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import {Link } from 'react-router-dom';
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

const  CreareContMenu = () =>{
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
                Creare cont
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/admindash/creare-cont-student" >
                    <StyledMenuItem >
                        <ListItemIcon onClick={handleClose}>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Creare cont student" onClick={handleClose} />
                    </StyledMenuItem>
                </Link>
                <Link to="/admindash/creare-cont-profesor">
                    <StyledMenuItem>
                        <ListItemIcon onClick={handleClose}>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Creare cont profesor" onClick={handleClose} />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </div>
    );
}

export default CreareContMenu;