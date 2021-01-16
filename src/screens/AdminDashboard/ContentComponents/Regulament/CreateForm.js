import React, {useState} from 'react'
import { Form} from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import IRegula from './Models/ModelRegula'

const CreateForm : React.FC = props => {


    const [regula, setRegula] = useState(props.regulaInit);

    const handleSubmit = () => {
        if(regula.idFacultate === NaN)
            regula.idFacultate = null;
        else
            regula.idFacultate = parseInt(regula.idFacultate);
        console.log(regula)
        window.location.reload()
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
                    style={{marginRight:5}}
                    onClick={props.handleClose}
                    variant={"contained"}
                    color="primary"
                    type='submit'
                     > Salveaza</Button>
                <Button
                    onClick={props.handleClose}
                    variant={"contained"}
                    color="secondary"
                    >Renunta</Button>

            </Form>
        </div>
    );

}
export default CreateForm;