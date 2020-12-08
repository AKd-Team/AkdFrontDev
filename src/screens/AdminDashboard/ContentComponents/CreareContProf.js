import React, {useState,useEffect} from "react";
import {useHistory} from "react-router";
import {Button, Divider, Form} from "semantic-ui-react";
import * as Transition from "react-reveal";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import axios from 'axios';
import Slide from "@material-ui/core/Slide";
const TransitionDialog = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
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
    const DepartamenteURL="http://localhost:4000/admin/departamente/1";
    const CreareContURL="http://localhost:4000/admin/registerProfesor"
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
    const [departament,setDepartament]=useState();
    const [departamente,setDepartamente]=useState([]);
    const grad = [
        {key:1,text:'Lector universitar/şef de lucrări',value: 'Lector univeristar'},
        {key:2,text:'Conferenţiar universitar',value: 'Conferentiar universitar'},
        {key:3,text:'Profesor universitar',value: 'Profesor univeristar'},
        ]
    const  getDepartamente = async e  =>{
        const config = {
            headers: { Authorization: `Bearer ${User.token}` }
        };
        await axios.get(DepartamenteURL,config)
            .then(function (response) {
                const depArray=[];
                for(let i=1;i<=response.data.length;i++){
                    depArray.push({
                        key:i,text:response.data[i-1].nume,value:response.data[i-1].idDepartament
                    })
                }
                setDepartamente(depArray);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        getDepartamente();
    },[])
    const [profesorNou,setProfesorNou]=useState({
        Username:username,
        Nume:lastName,
        Prenume:firstName,
        Cnp:CNP,
        TipUtilizator:"profesor",
        Mail:email,
        Password:password,
        Grad:Grad,
        IdDepartament:departament,
        Site:urlsite,
    });
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
    const handleSubmit = (e)=>{
        let Profesor = {
            Username:username,
            Nume:lastName,
            Prenume:firstName,
            Cnp:CNP,
            TipUtilizator:"profesor",
            Mail:email,
            Password:password,
            Grad:Grad,
            IdDepartament:departament,
            Site:urlsite,
        }
        if(Profesor.Username!==''
            &&Profesor.Password!==''
            &&Profesor.FirstName!==''
            &&Profesor.LastName!==''
            &&Profesor.Site!==''
            &&Profesor.Cnp!==''
            &&Profesor.Mail!==''
            &&Profesor.Grad!==''
        ){
            setProfesorNou(Profesor);
            setOpen(true);
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm= async ()=>{
        var data1=JSON.stringify({
            "Username":profesorNou.Username.toString(),
            "Nume":profesorNou.Nume.toString(),
            "Prenume":profesorNou.Prenume.toString(),
            "Cnp":profesorNou.Cnp.toString(),
            "TipUtilizator":"profesor",
            "Mail":profesorNou.Mail.toString(),
            "Password":profesorNou.Password.toString(),
            "Grad":profesorNou.Grad.toString(),
            "IdDepartament":profesorNou.IdDepartament,
            "Site":profesorNou.Site.toString(),
        });

        var axios = require('axios');
        var data2 = JSON.stringify({
            "Username":"andreica23",
            "Prenume":"profesor",
            "Nume":"profesor",
            "TipUtilizator":"profesor",
            "Mail":"anca@math.ro",
            "Password":"profesor",
            "Grad":"profesor",
            "Cnp":"1299291391213",
            "IdDepartament":1,
            "Site":"ancagrad.com"
        });
        console.log(data1)
        console.log(data2);
        var config = {
            method: 'post',
            url: 'http://localhost:4000/admin/registerProfesor',
            headers: {
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data1
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error.response);
            });


        //const Token=`Bearer ${User.token}`;
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': Token,
        //     },
        //     body: JSON.stringify(data),
        // };
        // fetch(CreareContURL, requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        setOpen(false);
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
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </Transition.Fade>
            </Form>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={TransitionDialog}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Please confirm that the teacher's  information is correct"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <h4>Username: {profesorNou.Username} </h4>
                            <h4>Password: {profesorNou.Password}</h4>
                            <h4>First Name: {profesorNou.Prenume}</h4>
                            <h4>Last Name: {profesorNou.Nume}</h4>
                            <h4>Cod numeric personal : {profesorNou.Cnp}</h4>
                            <h4>Email: {profesorNou.Mail}</h4>
                            <h4>Site: {profesorNou.Site}</h4>
                            <h4>Gradul: {profesorNou.Grad}</h4>
                            <h4>Departamentul {profesorNou.IdDepartament}</h4>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
};

export default CreareContProf;