import React, {useState, useEffect} from 'react'
import {Form} from 'semantic-ui-react'
import Button from '@material-ui/core/Button';

const EditForm: React.FC = (props) => {
    const [regula, setRegula] = useState({idRegulament: -1, titlu: "", continut: "", idFacultate: -1})

    useEffect(() => {
        setRegula(props.selected)
        console.log(regula)
    }, [props.selected])


    const handleSubmit = () => {
        regula.idRegulament = parseInt(regula.idRegulament, 10);
        console.log(regula)
        props.editRegula(regula);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    placeholder='Titlu'
                    onChange={(e) => {
                        setRegula({...regula, titlu: e.target.value});
                        console.log(regula.titlu)
                    }}
                    value={regula.titlu}/>
                <Form.TextArea
                    rows={10}
                    placeholder='Continut'
                    onChange={(e) => {
                        setRegula({...regula, continut: e.target.value});
                        console.log(regula.continut)
                    }}
                    value={regula.continut}
                />
                <Button
                    style={{marginRight: 5}}
                    onClick={() => props.setOpen(false)}
                    floated='right'
                    color="primary"
                    type='submit'
                    variant={"contained"}>
                    Salveaza</Button>
                <Button
                    onClick={() => props.setOpen(false)}
                    variant={"contained"}
                    floated='right'
                    type='button'
                    color="secondary">
                    Renunta </Button>
            </Form>

        </div>
    );

}
export default EditForm;