import React, {useState, useEffect} from 'react'
import { Form, Button } from 'semantic-ui-react'
//import type {IRegula} from "./Models/ModelRegula";

const FormComponent : React.FC = (props) => {
   // console.log(props.selected)
    const [regula, setRegula] =useState({idRegulament: -1, titlu: "", continut: "", idFacultate: -1})

    useEffect(()=>{
        setRegula(props.selected)
        console.log(regula)
    },[props.selected])


    const handleSubmit = () => {
        regula.idRegulament = parseInt(regula.idRegulament, 10);
        console.log(regula)
        props.editRegula(regula);
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    placeholder='Titlu'
                    onChange={(e) => { setRegula({...regula, titlu: e.target.value}); console.log(regula.titlu)}}
                    value={regula.titlu} />
                <Form.TextArea
                    rows={2}
                    placeholder='Continut'
                    onChange={ (e) => {setRegula({...regula, continut: e.target.value}); console.log(regula.continut)}}
                    value={regula.continut}
                />
                <Button
                    onClick={() => props.setOpen(false)}
                    floated='right'
                    positive
                    type='submit'
                    content='Salveaza' />
                <Button
                    onClick={() => props.setOpen(false)}
                    floated='right'
                    type='button'
                    content='Renunta' />

            </Form>
        </div>
    );

}
export default FormComponent;