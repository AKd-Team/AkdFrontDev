import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Button, Divider, Form} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import * as Transition from 'react-reveal';
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
const CreareContStudent = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));


    //States care sunt input field
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [CUP,setCUP]=useState('');
    const [CNP,setCNP]=useState('');
    const [email,setEmail]=useState('');

    //states care sunt dropdown
    const [grupe,setGrupe]=useState([]);
    const [grupa,setGrupa]=useState('');
    const [anStudiu,setAnStudiu]=useState('');
    const ani=[
        {key:'1',value:'1',text:'Anul 1'},
        {key:'2',value:'2',text:'Anul 2'},
        {key:'3',value:'3',text:'Anul 3'},
    ];


    //states care sunt checbox
    const [semiGrupa,setSemiGrupa]=useState('');

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
    const onChangeCNP = (e)=>{
        setCNP(e.target.value);
    }
    const togglePassword = (e) =>{
        setShowPassword(!showPassword);
    }
    const onChangeCUP = (e) =>{
        setCUP(e.target.value);
    }
    const onChangeAn = (e,{value})=>{
        setAnStudiu(value);
    }
    const onChangeGrupa = (e,{value})=>{
        setGrupa(value);
    }
    const onChangeSemigrupa= (e,{value})=>{
        setSemiGrupa(value);
    }
    const onChangeEmail = (e) =>{
        setEmail(e.target.value);
    }
    return(
        <div className={classes.root}>
        <Form className={classes.form}>
            <Transition.Fade bottom cascade>
                <div>
                    <h2>Va rog sa introduceti datele studentului</h2>
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
                        <Form.Input
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={onChangeEmail}
                        required={true}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label="Cod unic personal"
                            placeholder="Cod unic personal"
                            value={CUP}
                            onChange={onChangeCUP}
                            required={true}
                        />
                        <Form.Input
                            label="Cod numeric personal"
                            placeholder="Cod numeric personal"
                            value={CNP}
                            onChange={onChangeCNP}
                            required={true}
                        />
                    </Form.Group>
                </div>
                <div>
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        label='Anul de studiu'
                        clearable
                        fluid
                        upward
                        selection
                        options={ani}
                        onChange={onChangeAn}
                        placeholder='Alegeti anul de studiu'
                        required={true}
                    />
                    <Form.Dropdown
                        label='Grupa'
                        clearable
                        fluid
                        search
                        selection
                        upward
                        options={grupe}
                        onChange={onChangeGrupa}
                        placeholder='Alegeti grupa'
                        required={true}
                    />
                    <Form.Dropdown
                        label='Semigrupa'
                        clearable
                        fluid
                        selection
                        upward
                        options={[
                            {key:1,value:'1',text: 'Semigrupa 1'},
                            {key:2,value:'2',text:'Semigrupa 2'},
                        ]}
                        onChange={onChangeSemigrupa}
                        placeholder='Alegeti semigrupa'
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

export default CreareContStudent;