import React from "react";
import {useHistory} from "react-router";
import Fade from 'react-reveal';
const HomeContent = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    var HomeText;
    if(User!=null){
        if(User.Type==="admin"){
            HomeText=`This is home for ${User.username} with first name ${User.firstname} and last name ${User.lastname}`;
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
            <Fade bottom>
            <h1>{HomeText}</h1>
            </Fade>
        </div>
    );
};

export default HomeContent;