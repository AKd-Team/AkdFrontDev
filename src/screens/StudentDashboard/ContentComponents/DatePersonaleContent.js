import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Fade from 'react-reveal';


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
    var id;
    if(User!=null){
        if(User.tipUtilizator==="student"){
            id=User.id;
        }
        else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
        }
    }
    else{
        history.push("/");
    }
    const [personalData, setPersonalData]=useState({

        nume:"",
        prenume: "",
        cnp: "",
        mail:"",
        nrMatricol: "",
        cup : "",
        grupa: "",
        semigrupa: "",
        an_studiu: -1,
        facultate: "",
        nivel: "",
        specializare:""

        });


        const styles=useStyles();

        useEffect(()=>{

            axios.get("http://localhost:4000/student/info/"+id,{
                headers: {
                'Authorization': `token ${User.token}`
            }})
                .then((response) => {
                    console.log(response);
                    setPersonalData({
                        nume:response.data.nume,
                        prenume: response.data.prenume,
                        cnp: response.data.cnp,
                        mail:response.data.mail,
                        nrMatricol: response.data.nrMatricol,
                        cup : response.data.cup,
                        grupa: response.data.grupa,
                        semigrupa: response.data.semigrupa,
                        an_studiu: response.data.an_studiu,
                        facultate: response.data.facultate,
                        nivel: response.data.nivel,
                        specializare: response.data.specializare
                    })

                })
                .catch( (error) => {
                    console.log(error);
                });
    },[])



    return(
        <div>
            <Fade bottom cascade>
                <div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Nume, prenume:</text> <br></br>  {personalData.nume} {personalData.prenume}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}><text className={styles.infoText}>Student mail: </text> <br></br>  {personalData.mail} </p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Cnp: </text> <br></br>  {personalData.cnp}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Cod unic personal:</text> <br></br>  {personalData.cup} </p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Numar matricol:  </text> <br></br> {personalData.nrMatricol}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Facultate:  </text> <br></br> {personalData.facultate}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Specializare:  </text> <br></br> {personalData.specializare}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> An de studiu:  </text> <br></br> {personalData.an_studiu}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Grupa:  </text> <br></br> {personalData.grupa}</p> </div>
            <div className={styles.divColor}>
                <p className={styles.DPtext}>  <text className={styles.infoText}> Semigrupa:  </text> <br></br> {personalData.semigrupa}</p> </div>
                </div>
            </Fade>
        </div>
    );
};

export default DatePersonaleContent;