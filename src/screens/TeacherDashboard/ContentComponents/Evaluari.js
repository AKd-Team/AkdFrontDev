import React from "react";
import {useHistory} from "react-router";

const Evaluari=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    if(User!=null){
        if(User.tipUtilizator==="profesor"){

        }
        else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizatore}`);
        }
    }
    else{
        history.push("/");
    }
    return(
        <div>
            <h1>This is Evaluari</h1>
        </div>
    );
};

export default Evaluari;