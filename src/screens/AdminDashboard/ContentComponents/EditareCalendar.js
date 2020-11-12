import React from "react";
import {useHistory} from "react-router";

const EditareCalendar = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    if(User!=null){
        if(User.Type==="admin"){

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
            <h1>Editare calendar, se poat adauga zilele libere</h1>
        </div>
    );
};

export default EditareCalendar;