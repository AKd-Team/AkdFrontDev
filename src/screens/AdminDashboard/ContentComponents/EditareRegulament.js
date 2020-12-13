import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";

const EditareRegulament = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const [regulament, setRegulament]=useState([]);

    const idSpecializare=User.idSpecializare;

    useEffect(()=>{

        axios.get("http://localhost:4000/admin/listaReguli/"+idSpecializare,{
            headers: {
                'Authorization': `token ${User.token}`
            }})
            .then((response) => {

                setRegulament(new Array(response.data.length).fill().map((value, index) => ({
                    idRegulament: response.data[index].idRegulament,
                    titlu: response.data[index].titlu,
                    continut: response.data[index].continut,
                    idFacultate: response.data[index].idFacultate })));
            })
            .catch( (error) => {
                console.log(error);
            });
    },[])

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
    if(regulament.length>0) {

        return (
            <div>
                {regulament.map(((item) => (
                    <div key={item.idRegulament} className="post">
                        <h3>{item.titlu} </h3>
                        <p>{item.continut}</p>
                    </div>
                )))}
            </div>
        );
    }
    return(0);
};

export default EditareRegulament;