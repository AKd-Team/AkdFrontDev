import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    divColor:{
        backgroundColor:'#E7EDF8',
        paddingBottom:'2%',
        paddingTop:'2%',
        marginBottom: '1%',
        marginTop:'2%',
        marginLeft:'25%',
        marginRight:'25%',
        border: '2px solid #004276',
        textAlign: 'center',
        borderRadius: 6


    },
    DPtext:{
        fontSize:18,
        alignContent:'center',
    },
    infoText:{
        fontWeight: 'bold',
        color: '#004276'
    }

}))


const DatePersonaleContent=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    console.log(User.userId);
    console.log(User.token);
    console.log(User.firstname);
    console.log(User.lastname);
    console.log(User.Type);
    console.log(User.username);

    const [personalData, setPersonalData]=useState({
        userId: -1,
        username:"",
        firstname:"",
        las: "",
        Typtname:"",
        cnpe: "",
        mail:"",
        nrMatricol: "",
        cup : "",
        idFormatie: -1,
        idSpecializare:-1
        });

        const id=User.userId;
        const styles=useStyles();

        useEffect(()=>{
            axios.get("http://localhost:4000/student/info/"+id,{
                headers: {
                'Authorization': `token ${User.token}`
            }})
                .then((response) => {
                    console.log(response);
                    setPersonalData({
                        userId: response.data.userId,
                        username:response.data.username,
                        firstname:response.data.prenume,
                        lastname:response.data.nume,
                        cnp: response.data.cnp,
                        mail: response.data.mail,
                        nrMatricol: response.data.nrMatricol,
                        cup : response.data.cup,
                        idFormatie: response.data.idFormatie,
                        idSpecializare:response.data.idSpecializare
                    })

                })
                .catch( (error) => {
                    console.log(error);
                });
    },[])

    if(User!=null){
        if(User.Type==="student"){

        }
        else {
            history.push(`/${User.Type}dash/${User.Type}`);
        }
    }
    else{
        history.push("/");
    }

    return(
        <div>

          <div className={styles.divColor}>
              <p className={styles.DPtext}> <text className={styles.infoText}> Username: </text> <br></br>  {personalData.username} </p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Nume, prenume:</text> <br></br>  {personalData.lastname} {personalData.firstname}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}><text className={styles.infoText}>Student mail: </text> <br></br>  {personalData.mail} </p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Cnp: </text> <br></br>  {personalData.cnp}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Cod unic personal:</text> <br></br>  {personalData.cup} </p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Numar matricol:  </text> <br></br> {personalData.nrMatricol}</p> </div>
        </div>
    );
};

export default DatePersonaleContent;