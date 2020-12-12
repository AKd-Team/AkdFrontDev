import React from "react";
import {useHistory} from "react-router";

const ProgramareExamen=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    if(User!=null){
        if(User.tipUtilizator==="profesor"){

        }
        else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
        }
    }
    else{
        history.push("/");
    }
    return(
        <div>
            <h1>This is Programare Examen</h1>
        </div>
    );

};

export default ProgramareExamen;