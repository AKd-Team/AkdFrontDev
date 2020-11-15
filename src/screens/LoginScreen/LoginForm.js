import React, {useState} from "react";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useHistory} from "react-router";




const useStyles = makeStyles((theme) => ({
    center:{
        margin: 'auto',
        width: '26%'

    },
    root: {
        padding: '2px 4px',
        borderRadius: 35,
        display: 'flex',
        alignItems:'center',
        width: 400,
        marginBottom: '5%',
        border: '2px solid #004276',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 2,
    },
    iconButton: {
        padding: 15,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    loginButton: {
        borderRadius: 35,
        marginLeft: '40%',
        color: '#004276',
        display: 'flex',
        alignItems:'center',
    },
    loginBtnText:{
        color:'white',
        fontWeight: 'bold'
    }
}));


function LoginForm({ Login, error }) {
    const history=useHistory();
    const[details, setDetails]=useState({username:"", password:""});
   // const[username, setUsername]=useState("");
   // const[password, setPassword]=useState("");


    const submitHandler = async e =>{
        e.preventDefault();
       // "http://localhost:4000/users/authenticate"
        //"https://reqres.in/api/login"
       // console.log("form submitted");
       /* axios.post("https://reqres.in/api/login", {
            user:{
                username: details.username,
                password: details.password
            }
        },
            {
                withCredentials: true
            }).then(response =>{
                console.log("registration res", response);
        }).catch(error => {
            console.log("login error", error);
        })*/

        // fetch("https://reqres.in/api/login", {
        //     method:'POST',
        //     headers:{
        //         'Accept':'application/json',
        //         'Content-type':'application/json'
        //     },
        //     body: JSON.stringify(details)
        // }).then(res => res.json())
        //     .then((data) => {
        //         console.log("response data", data);
        //     }).catch(error =>{
        //         console.log("login err", error);
        // })


        //adaugat de mine
        let User={
            username:details.username,
            parola: details.password,
            Type: details.username
        }
        localStorage.setItem("user",JSON.stringify(User));
        history.push(`/${User.Type}dash/${User.Type}`);
    }

    const classes = useStyles();

    return(
<form onSubmit={submitHandler}>
            <div className={classes.center} >
                {/*error*/}
                <Paper component="form"  className={classes.root} >
                    <PersonIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Username"
                        onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
                </Paper>

                <Paper component="form" className={classes.root}>
                    <LockIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Password"
                        type={"password"}
                        onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>

                </Paper>
                <div>
                    <Button variant="contained" size="large" color="primary" className={classes.loginButton} type={"submit"}  >
                       <text className={classes.loginBtnText}>login</text>
                    </Button>
                </div>
            </div>
</form>


    );
}

export default LoginForm;