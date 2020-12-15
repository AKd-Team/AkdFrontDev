import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    icons: {

        textAlign: 'right',
        color: '#004276'
    }
}))


const AlertDialog = props => {
    const [open, setOpen] = useState(false);
    const styles=useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <div className={styles.icons}>
            <DeleteIcon onClick={handleClickOpen}/></div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    id="alert-dialog-slide-title">{"Sunteti sigur ca vreti sa stergeti aceasta regula?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onDelete} color="primary">
                        Sterge
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Renunta
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;