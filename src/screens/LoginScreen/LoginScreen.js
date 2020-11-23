import React, {useEffect} from "react";
import LoginForm from "./LoginForm";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";


const styles = makeStyles((theme) => ({
    divStyle:{
        marginTop: '10%',
        marginBottom: '5%',
        margin: 'auto',
        width: '30%'
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
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        if(User!=null){
            history.push(`/${User.Type}dash/${User.Type}`)
        }
    },[]);
    const s=styles();
     return(
         <div className="LoginScreen">
             <div className={s.divStyle}>
                 <text className={s.academicText}>Academic
                     <text className={s.infoText}>Info</text>
                 </text>
                 <p className={s.ubbText}>Universitatea Babes-Bolyai</p>
             </div>
             <LoginForm onLogin={props.onLogin} history={props.history}/>
         </div>
     )
};


export default LoginScreen;