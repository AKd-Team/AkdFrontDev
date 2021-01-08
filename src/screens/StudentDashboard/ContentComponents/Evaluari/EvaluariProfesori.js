import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {Button} from "semantic-ui-react"
import type {OptiuneModel} from "./OptiuneModel";
import TabelOptiuni from "./TabelOptiuni";
import {Fragment} from "semantic-ui-react"
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    titlu: {
        fontSize: 30,
        marginTop: 30,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center'
        }

}));

const EvaluariProfesori=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const idStudent = User.id;
    const [optiuni, setOptiuni] = useState([])
    const [deEvaluat, setDeEvaluat] = useState([])
    const styles=useStyles();

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

    console.log(User.id);

    const getOptiuni = async () => {
        const array =[];
        await axios.get("http://localhost:4000/student/optiuniReview/" + idStudent, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        }).then((response) => {
            setOptiuni(new Array(response.data.length).fill().map((value, index) => ({
                idMaterie: response.data[index].idMaterie,
                numeMaterie: response.data[index].numeMaterie,
                anDeStudiu: response.data[index].anDeStudiu,
                anCalendaristic: response.data[index].anCaledaristic,
                deEvaluat: false
            })));
            setDeEvaluat(new Array(response.data.length).fill().map((value, index) => ({
                curs: response.data[index].curs,
                seminar: response.data[index].seminar,
                laborator: response.data[index].laborator,
            })))
            console.log(response.data);
        })
            .catch(function (error) {

                console.log(error);
            });
    }

    useEffect(() => {
        getOptiuni();

    }, [])

    const see= () => {
        getOptiuni();
        console.log(optiuni);
        console.log(deEvaluat);
    }

    // function sePoateEvalua(optiune: OptiuneModel) {
    //     if(optiune.laborator === true || optiune)
    // }

    return(
        <React.Fragment>
            <div className={styles.titlu}>Evaluare Profesori</div>
            <Button on onClick={() => see()}>PRESS ME DADDY</Button>
            <TabelOptiuni optiuni={optiuni}/>
        </React.Fragment>
    );
};

export default EvaluariProfesori;