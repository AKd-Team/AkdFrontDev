import React from "react";
import {useHistory} from "react-router";
import Fade from 'react-reveal';
const HomeContent = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    var HomeText;
    if(User!=null){
        if(User.tipUtilizator==="admin"){
            HomeText=`This is home for ${User.username} with first name ${User.prenume} and last name ${User.nume}`;
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
            <Fade bottom>
            <h1>{HomeText}</h1>
            </Fade>
        </div>
    );
};

export default HomeContent;