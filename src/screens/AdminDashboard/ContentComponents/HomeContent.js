import React from "react";
import {useHistory} from "react-router";

const HomeContent = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    var HomeText;
    if(User!=null){
        if(User.Type==="admin"){
            HomeText=`This is home for ${User.username}`;
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
            <h1>{HomeText}</h1>
        </div>
    );
};

export default HomeContent;