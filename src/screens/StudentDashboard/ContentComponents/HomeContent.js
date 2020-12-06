import React ,{useState} from "react";
import {useHistory} from "react-router";
import {Frame,Page,Scroll,Stack} from 'framer';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import Anunturi from "./HomeComponents/Anunturi";
const useStyles = makeStyles((theme) => ({
    root:{
        width: '100%',
        position: 'relative',
    }
}));
const HomeContent = () =>{
    const history=useHistory();
    const [crtAnunt,setCrtAnunt]=useState(1);
    const User=JSON.parse(localStorage.getItem("user"));
    var HomeText;
    if(User!=null){
        if(User.Type==="student"){
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
        <Stack
            width="100%"
            height="100%"
            backgroundColor={"white"}

        >
                <Frame
                    borderRadius={10}
                    style={{marginRight:"1%",marginLeft:"1%"}}
                    position={"relative"}
                    width="100%"
                    image={"https://files.primariaclujnapoca.ro/universitate/MG_0437_Universitatea-Babes-Bolyai.jpg"}
                >
                </Frame>
            <Frame
                height={"100%"}
                width={"100%"}
                backgroundColor={"white"}
            >


            <Stack
                gap={5}
                width={"100%"}
                direction={"horizontal"}
            >
                <Anunturi/>
                <Frame
                    borderRadius={30}
                    width={"30%"}
                >
                </Frame>
            </Stack>
            </Frame>
        </Stack>
    );
};

export default HomeContent;