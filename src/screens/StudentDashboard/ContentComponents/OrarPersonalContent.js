import React from "react";
import {useHistory} from "react-router";

const OrarPersonalContent=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
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
            <h1>This is Orar Personal</h1>
        </div>
    );
};

export default OrarPersonalContent;