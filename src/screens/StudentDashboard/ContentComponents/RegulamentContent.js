import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import Fade from "react-reveal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    divColor:{
        backgroundColor:'#E7EDF8',
        paddingBottom:'2%',
        paddingTop:'2%',
        marginBottom: '1%',
        marginTop:'2%',
        marginLeft:'15%',
        marginRight:'15%',
        border: '2px solid #004276',
        borderRadius: 6
    },
    continut:{
        fontSize:18,
        contentAlign: 'left',
        marginLeft:10
    },
    titlu:{
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#004276'
    },
    eroare:{
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },
    divErr:{
        marginTop:'15%'
    }
}))

const RegulamentContent = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const [regulament, setRegulament]=useState([]);

    const idSpecializare=User.idSpecializare;
    const styles=useStyles();

    useEffect(()=>{

        axios.get("http://localhost:4000/student/regulament/"+idSpecializare,{
            headers: {
                'Authorization': `token ${User.token}`
            }})
            .then((response) => {

                setRegulament(new Array(response.data.length).fill().map((value, index) => ({
                    idRegulament: response.data[index].idRegulament,
                    titlu: response.data[index].titlu,
                    continut: response.data[index].continut,
                    idFacultate: response.data[index].idFacultate })));
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
    },[])

    console.log(regulament);
    if(User!=null){
        if(User.tipUtilizator==="student"){

        }
        else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
        }
    }
    else{
        history.push("/");
    }


        return (
            <div>
                {regulament.map(((item) => (
                    <div key={item.idRegulament} className={styles.divColor}>
                        <p className={styles.titlu}> {item.titlu} </p>
                        <p className={styles.continut}> {item.continut}</p>
                    </div>
                )))}
            </div>
        );


};

export default RegulamentContent;