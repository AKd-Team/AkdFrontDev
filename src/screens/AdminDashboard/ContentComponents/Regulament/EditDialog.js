import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EditForm from "./EditForm";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditDialog: React.FC = props => {
    return (
        <div>

            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => props.setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    id="alert-dialog-slide-title">{"Editare regula"}</DialogTitle>
                <DialogContent>

                    <EditForm
                        setOpen={props.setOpen}
                        selected={props.selectedItem}
                        editRegula={props.editRegula}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditDialog;