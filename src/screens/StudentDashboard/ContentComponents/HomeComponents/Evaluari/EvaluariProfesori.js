import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {Button} from "semantic-ui-react"
import type {OptiuneModel} from "./OptiuneModel";
import TabelOptiuni from "./TabelOptiuni";
import {Fragment} from "semantic-ui-react"


const EvaluariProfesori=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const idStudent = User.id;
    const [optiuni, setOptiuni] = useState([])

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
                deEvaluat : {
                    curs: response.data[index].curs,
                    seminar: response.data[index].seminar,
                    laborator: response.data[index].laborator
                }
            })));
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
    }

    // function sePoateEvalua(optiune: OptiuneModel) {
    //     if(optiune.laborator === true || optiune)
    // }

    return(
        <React.Fragment>
            <div>Evaluare Profesori</div>
            <TabelOptiuni optiuni={optiuni}/>
        </React.Fragment>
    );
};

export default EvaluariProfesori;