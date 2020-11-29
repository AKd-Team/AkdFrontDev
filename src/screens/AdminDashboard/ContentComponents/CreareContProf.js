import React, {useState} from "react";
import {useHistory} from "react-router";
import Zoom from 'react-reveal/Zoom';
import {Button, Divider, Form} from "semantic-ui-react";
import * as Transition from "react-reveal";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
    },
    form:{
        marginTop: 50,
        marginLeft: 30,
        marginRight:30,
        justifyContent:'center',
        alignItems: 'center',
    },
    bttnGroup:{
        marginTop: 50,
        marginLeft: 'auto',
        marginRight:'auto',
        justifyContent:'center',
        alignItems: 'center'
    }
}));
const CreareContProf = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));

    //States care sunt input field
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [urlsite,setUrlSite]=useState('');
    const [CNP,setCNP]=useState('');
    const [Grad,SetGrad]=useState('');
    const [departament,setDepartament]=useState('');
    const [departamente,setDepartamente]=useState([]);
    const grad = [
        {key:1,text:'Lector universitar/şef de lucrări',value: 'lector'},
        {key:2,text:'Conferenţiar universitar',value: 'conferentiar'},
        {key:3,text:'Profesor universitar',value: 'profesor'},
        ]
    //states care sunt dropdown


    const [showPassword,setShowPassword]=useState(false);

    const classes = useStyles();
    if(User!=null){
        if(User.Type==="admin"){

        }
        else {
            history.push(`/${User.Type}dash/${User.Type}`);
        }
    }
    else{
        history.push("/");
    }
    const onChangeUsername= (e) =>{
        setUsername(e.target.value);
    }
    const onChangePassword = (e) =>{
        setPassword(e.target.value);
    }
    const onChangeFirstName = (e) =>{
        setFirstName(e.target.value);
    }
    const onChangeLastName = (e) =>{
        setLastName(e.target.value);
    }
    const togglePassword = (e) =>{
        setShowPassword(!showPassword);
    }
    const onChangeEmail = (e) =>{
        setEmail(e.target.value);
    }
    const onChangeSite = (e) =>{
        setUrlSite(e.target.value);
    }
    const onChangeCNP =(e)=>{
        setCNP(e.target.value);
    }
    const onChangeGrad= (e,{value})=>{
        SetGrad(value);
    }
    const onChangeDepartament = (e,{value})=>{
        setDepartament(value)
    }
    return(
        <div className={classes.root}>
            <Form className={classes.form}>
                <Transition.Fade bottom cascade>
                    <div>
                        <h2>Va rog sa introduceti datele profesorului</h2>
                        <Divider/>
                    </div>
                    <div>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Username"
                                placeholder="Username"
                                value={username}
                                onChange={onChangeUsername}
                                required={true}
                            />
                            <Form.Input
                                label="Parola"
                                placeholder="Parola"
                                type={showPassword ? '': 'password'}
                                value={password}
                                onChange={onChangePassword}
                                required={true}
                            />

                        </Form.Group>
                        <Form.Group>
                            <Form.Checkbox
                                inline={true}
                                checked={showPassword}
                                label="Arata parola"
                                onChange={togglePassword}
                            />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Prenume"
                                placeholder="Prenume"
                                value={firstName}
                                onChange={onChangeFirstName}
                                required={true}
                            />
                            <Form.Input
                                label="Nume de familie"
                                placeholder="Nume de familie"
                                value={lastName}
                                onChange={onChangeLastName}
                                required={true}
                            />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="CNP"
                                placeholder="CNP"
                                value={CNP}
                                onChange={onChangeCNP}
                                required={true}
                            />
                            <Form.Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                onChange={onChangeEmail}
                                required={true}
                            />
                            <Form.Input
                                label="Site"
                                placeholder="Url Site"
                                value={urlsite}
                                onChange={onChangeSite}
                                required={true}
                            />
                        </Form.Group>

                    </div>
                    <div>
                        <Form.Group widths='equal'>

                            <Form.Dropdown
                                label='Gradul'
                                clearable
                                fluid
                                upward
                                selection
                                options={grad}
                                onChange={onChangeGrad}
                                placeholder='Alegeti gradul profesorului'
                                required={true}
                            />
                            <Form.Dropdown
                                label='Departamentul'
                                clearable
                                fluid
                                upward
                                selection
                                options={departamente}
                                onChange={onChangeDepartament}
                                placeholder='Alegeti departamentul profesorului'
                                required={true}
                            />
                        </Form.Group>
                    </div>
                    <div className={classes.bttnGroup}>
                        <Button>Submit</Button>
                    </div>
                </Transition.Fade>
            </Form>
        </div>

    );
};

export default CreareContProf;