import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import {IRegula} from "./Models/ModelRegula";
import FormComponent from "./EditForm";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    icons: {

        textAlign: 'right',
        color: '#004276'
    }
}))

interface IProps{
    selectedItem: IRegula | null;
    setEditMode: (editMode: boolean) => void;
    createRegula : (regula: IRegula) => void;
    editRegula : (regula: IRegula) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    submitting: boolean;
    handleCancel: () => void;
}
const EditCreateDialog : React.FC<IProps> = ({selectedItem, setEditMode, createRegula, editRegula, open, setOpen, submitting, handleCancel}) => {
    const styles=useStyles();

    return (
        <div>
            <div className={styles.icons}></div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
            >
                <DialogTitle > Editare regula: </DialogTitle>
                <DialogContent>
                    <FormComponent
                        selectedItem={selectedItem}
                        createRegula={createRegula}
                        editRegula={editRegula}
                        open={open}
                        setOpen={setOpen}
                        submitting={submitting}
                        handleCancel={handleCancel}>
                        <Button color="secondary" onClick={() => {console.log("al treilea selected item"); console.log(selectedItem)}}>selectItem</Button>
                        </FormComponent>


                </DialogContent>

            </Dialog>
        </div>
    );
}

export default EditCreateDialog;