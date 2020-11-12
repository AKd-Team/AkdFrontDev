import React from "react";
import {useHistory} from "react-router";

const OrarPersonalizat=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    if(User!=null){
        if(User.Type==="teacher"){

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
            <h1>This is Orar Personalizat</h1>
        </div>
    );
};

export default OrarPersonalizat;