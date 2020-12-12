import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useHistory} from "react-router";
import {Button, Divider, Form} from 'semantic-ui-react';
import {makeStyles} from "@material-ui/core/styles";
import * as Transition from 'react-reveal';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from "@material-ui/core/colors";
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
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        width:20,
        height:20,
        marginTop: -12,
        marginLeft: -12,
    }
}));
const TransitionDialog = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const CreareContStudent = () =>{
    const history=useHistory();
    const timer = React.useRef();
    const User=JSON.parse(localStorage.getItem("user"));
    const FormSpecURL=`http://localhost:4000/admin/formSpec/${User.idfacultate}`;

    //States care sunt input field
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [CUP,setCUP]=useState('');
    const [CNP,setCNP]=useState('');
    const [email,setEmail]=useState('');
    const [nrMatricol,setNrMatricol]=useState('');
    const [specializari,setSpecializari]=useState([]);
    const [loading,setLoading]=useState(false);

    const [loadingSpec,setLoadingSpec]=useState(false);
    const [succes,setSucces]=useState();
    const [confirmDialog,setConfirmDialog]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [responsedata,setResponsedata]=useState();
    //states care sunt dropdown
    const [grupe,setGrupe]=useState([]);
    const [grupa,setGrupa]=useState('');
    const [disableGrupe,setDisableGrupe]=useState(true);
    const [specializare,setSpecializare]=useState('');

    const getFormSpec=async ()=>{
        setLoadingSpec(true);
        const config = {
            headers: { Authorization: `Bearer ${User.token}` }
        };
        await axios.get(FormSpecURL,config)
            .then(function (response) {
                setResponsedata(response.data);
                const Array=[];
                for(let i=1;i<=response.data.length;i++){
                    Array.push({
                        key:i,text:response.data[i-1].specializare,value:response.data[i-1].specializare
                    })
                }
                setSpecializari(Array);
                setLoadingSpec(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        getFormSpec()
    },[])
    useEffect(()=>{
        console.log(specializare);
        if(specializare!==''){
            const findSpecializare = (element => element.specializare === specializare)
            const found = responsedata.findIndex(findSpecializare);
            var listagrupe=[]
            for (let i = 0; i < responsedata[found].grupe.length; i++) {
                listagrupe.push({key: i, text: responsedata[found].grupe[i], value: responsedata[found].grupe[i]})
            }
            setDisableGrupe(false);
            setGrupe(listagrupe);
        }
        else {
            setDisableGrupe(true);
            setGrupe([]);
            setGrupa('');
        }
    },[specializare])
    const [studentNou,setStudentNou]=useState({
        username:'',
        pass: '',
        FirstName:'',
        LastName:'',
        cup:'',
        cnp:'',
        Email:'',
        Grupa:'',
        an:'',
        semigrupa:'',
        nrMatricol:'',
        specializare:'',
    });


    //states care sunt checbox
    const [semiGrupa,setSemiGrupa]=useState('');

    const [showPassword,setShowPassword]=useState(false);

    const classes = useStyles();
    if(User!=null){
        if(User.tipUtilizator==="admin"){

        }
        else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
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
    const onChangeNrMatricol = (e)=>{
        setNrMatricol(e.target.value);
    }
    const togglePassword = (e) =>{
        setShowPassword(!showPassword);
    }
    const onChangeCUP = (e) =>{
        setCUP(e.target.value);
    }
    const onChangeSpecializare = (e,{value})=>{
        setSpecializare(value);
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

    const handleSubmit = (e)=>{
        let Student = {
            username:username,
            pass: password,
            FirstName:firstName,
            LastName:lastName,
            cup:CUP,
            cnp:CNP,
            Email:email,
            Grupa:grupa,
            specializare:specializare,
            nrMatricol:nrMatricol,
            semigrupa:`${grupa}/${semiGrupa}`,
        }
        if(Student.username!==''
            &&Student.pass!==''
            &&Student.FirstName!==''
            &&Student.LastName!==''
            &&Student.cup!==''
            &&Student.cnp!==''
            &&Student.Email!==''
            &&Student.nrMatricol!==''
            &&Student.specializare!==''
            &&Student.semigrupa!==''
        ){
            setStudentNou(Student);
            setOpen(true);
        }
    }

    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm= ()=>{
        console.log(studentNou);
        var data1=JSON.stringify({
            "Username": studentNou.username,
            "Nume": studentNou.LastName,
            "Prenume": studentNou.FirstName,
            "Cnp": studentNou.cnp,
            "TipUtilizator": "student",
            "Mail": studentNou.Email,
            "Password": studentNou.pass,
            "NrMatricol": studentNou.nrMatricol,
            "Cup": studentNou.cup,
            "Semigrupa": studentNou.semigrupa,
            "Specializare": studentNou.specializare
        })
        setLoading(true);
        var axios = require('axios');
        var config = {
            method: 'post',
            url: 'http://localhost:4000/admin/registerStudent',
            headers: {
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data1
        };

        axios(config)
            .then(function (response) {
                timer.current = window.setTimeout(() => {
                    setLoading(false);
                    setOpen(false);
                    setConfirmDialog(true)
                    setSucces(true);
                }, 1500);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                timer.current=window.setTimeout(()=>{
                    setLoading(false);
                    setOpen(false);
                    setConfirmDialog(true)
                    setSucces(false);
                    setErrorMsg(error.response.statusText);
                },1000);
                console.log(error.response);
            });

        setOpen(false);
    }
    const handleCloseResponse=()=>{
        setConfirmDialog(false)
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
                        <Form.Input
                            label="Numar matricol"
                            placeholder="Numar matricol"
                            value={nrMatricol}
                            onChange={onChangeNrMatricol}
                            required={true}
                        />
                    </Form.Group>
                </div>
                <div>
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        loading={loadingSpec}
                        label='Specializarea'
                        clearable
                        fluid
                        upward
                        selection
                        options={specializari}
                        onChange={onChangeSpecializare}
                        placeholder='Alegeti specialziarea'
                        required={true}
                    />
                    <Form.Dropdown
                        disabled={disableGrupe}
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
                    <DialogTitle id="alert-dialog-slide-title">{"Verifica-ti daca datele studentului sunt bune"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <h4>Username: {studentNou.username} </h4>
                            <h4>Password: {studentNou.pass}</h4>
                            <h4>First Name: {studentNou.FirstName}</h4>
                            <h4>Last Name: {studentNou.LastName}</h4>
                            <h4>Cod unic personal: {studentNou.cup}</h4>
                            <h4>Cod numeric personal : {studentNou.cnp}</h4>
                            <h4>Email: {studentNou.Email}</h4>
                            <h4>Grupa: {studentNou.Grupa}</h4>
                            <h4>Nr. Matricol: {studentNou.nrMatricol}</h4>
                            <h4>Specializare: {studentNou.specializare}</h4>
                            <h4>Semigrupa:{studentNou.semigrupa}</h4>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <div>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                disabled={loading}
                                onClick={handleConfirm}
                            >
                                <text>Confirm</text>
                                {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={confirmDialog}
                    TransitionComponent={TransitionDialog}
                    keepMounted
                    onClose={handleCloseResponse}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Message"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {succes && <h2>Cont creat cu succes</h2>}
                            {!succes && <h2>{errorMsg}</h2>}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseResponse} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
};

export default CreareContStudent;