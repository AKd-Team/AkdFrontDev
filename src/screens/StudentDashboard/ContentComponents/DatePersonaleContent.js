import React from "react";
import {useHistory} from "react-router";

const DatePersonaleContent=()=>{
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
            <h1>This is date personale</h1>
        </div>
    );
};

export default DatePersonaleContent;