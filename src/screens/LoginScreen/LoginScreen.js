import React, { useState} from "react";
import {Button} from "semantic-ui-react";
import LoginForm from "./LoginForm";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import axios from 'axios';


const styles = makeStyles((theme) => ({
    divStyle:{
        marginTop: '10%',
        marginBottom: '5%',
        margin: 'auto',
        width: '27%'
    },
    academicText: {
        fontSize: '70px',

    },
    infoText: {
        color: '#004276',
        fontWeight: 'bold',
    },
    ubbText: {
        fontSize: '30px',
        marginLeft:30,

    }
}));

const LoginScreen = (props) =>{
    const history = useHistory();
    const studentUser={
        username: "teacher",
        password: "123"
    }

    const[user, setUser]= useState({username:""})
    const[error, setError]=useState("");

    const s=styles();

    const  Login =  (details) =>{
        setUser({
            username:details.username,
            password: details.password
        });
        history.push(`/${details.username}dash/${details.username}`)
    }



     return(
         <div className="LoginScreen">
             <div className={s.divStyle}>
                 <text className={s.academicText}>Academic
                     <text className={s.infoText}>Info</text>
                 </text>
                 <p className={s.ubbText}>Universitatea Babes-Bolyai</p>
             </div>

             <LoginForm Login={Login} error={error} />

             
         </div>
     )
};


export default LoginScreen;