import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react'
import IRegula from './Models/ModelRegula'

const CreateForm : React.FC = props => {


    const [regula, setRegula] =useState(props.regulaInit);

    const handleSubmit = () => {
        if(regula.idFacultate === NaN)
            regula.idFacultate = null;
        else
            regula.idFacultate = parseInt(regula.idFacultate, 10);
        console.log(regula)

        props.createRegula(regula)
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    placeholder='Titlu'
                    onChange={ (e) => {setRegula({...regula, titlu: e.target.value}); console.log(regula.titlu)}}
                    value={regula.titlu} />

                 <Form.TextArea
                    rows={6}
                    placeholder='Continut'
                    onChange={ (e) => {setRegula({...regula, continut: e.target.value}); console.log(regula.continut)}}
                    value={regula.continut}
                    />
                 <Form.Input
                    rows={2}
                    placeholder='Id Facultate'
                    onChange={(e) => setRegula({...regula, idFacultate: e.target.value})}
                    value={regula.idFacultate}
                    />

                <Button
                    //loading={submitting}
                    onClick={props.handleClose}
                    floated='right'
                    positive
                    type='submit'
                    content='Salveaza' />
                <Button
                    onClick={props.handleClose}
                    floated='right'
                    type='button'
                    content='Renunta' />

            </Form>
        </div>
    );

}
export default CreateForm;