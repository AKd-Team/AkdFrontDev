import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from "@material-ui/core/styles";
import {AddBox} from "@material-ui/icons";
import CreateForm from './CreateForm'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    icons: {

        textAlign: 'right',
        color: '#004276'
    }
}))
const CreateDialog: React.FC = props => {

    const [open, setOpen] = useState(false);
    const styles = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <div className={styles.icons}><AddBox onClick={handleClickOpen}/></div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    id="alert-dialog-slide-title">{"Creare regula"}</DialogTitle>
                <DialogContent>
                    <CreateForm
                        regulaInit={props.regulaInit}
                        handleClose={handleClose}
                        createRegula={props.createRegula}/>
                </DialogContent>


            </Dialog>
        </div>
    );
}

export default CreateDialog;