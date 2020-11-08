import React, {useEffect, useState} from "react";
import {Button} from "semantic-ui-react";
import LoginForm from "./LoginForm";
import {makeStyles} from "@material-ui/core/styles";

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
    const studentUser={
        username: "ala",
        password: "bala"
    }

    const[user, setUser]= useState({username:""})
    const[error, setError]=useState("");

    const s=styles();

    const Login = details =>{
        console.log(details);

        if(details.username == studentUser.username && details.password == studentUser.password)
        {
            console.log("logged in");
            setUser({
                username:details.username,
                password: details.password
            });

        }
        else
        {
            console.log("details do not match")
        }
    }



    useEffect(()=>{
        window.history.pushState({},'','/login')
    },[])

     return(
         <div className="LoginScreen">
             <div className={s.divStyle}>
                 <text className={s.academicText}>Academic
                     <text className={s.infoText}>Info</text>
                 </text>
                 <p className={s.ubbText}>Universitatea Babes-Bolyai</p>
             </div>

             <LoginForm Login={Login} error={error} />

             <Button variant="contained" size="large"  onClick={props.onLogin}>
                 login
             </Button>
             
         </div>
     )
};


export default LoginScreen;