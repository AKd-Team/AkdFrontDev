import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {IRegula} from "./Models/ModelRegula";
import FormComponent from "./EditForm";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
    selectedItem: IRegula | null;
    setEditMode: (editMode: boolean) => void;
    createRegula: (regula: IRegula) => void;
    editRegula: (regula: IRegula) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    submitting: boolean;
    handleCancel: () => void;
}

const EditCreateDialog: React.FC<IProps> = ({selectedItem, createRegula, editRegula, open, setOpen, submitting, handleCancel}) => {

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
            >
                <DialogTitle> Editare regula: </DialogTitle>
                <DialogContent>
                    <FormComponent
                        selectedItem={selectedItem}
                        createRegula={createRegula}
                        editRegula={editRegula}
                        open={open}
                        setOpen={setOpen}
                        submitting={submitting}
                        handleCancel={handleCancel}>
                        <Button color="secondary" onClick={() => {
                            console.log("al treilea selected item");
                            console.log(selectedItem)
                        }}>selectItem</Button>
                    </FormComponent>


                </DialogContent>

            </Dialog>
        </div>
    );
}

export default EditCreateDialog;