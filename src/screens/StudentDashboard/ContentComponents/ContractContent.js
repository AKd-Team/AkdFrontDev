import React from "react";
import {useHistory} from "react-router";

const ContractContent=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
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
    return(
        <div>
            <h1>This is Contracte</h1>
        </div>
    );

};

export default ContractContent;