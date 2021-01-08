import React ,{useState,useEffect} from 'react';
import NavBar from "../NavigationComponents/NavBar";
import HomeContent from "./HomeContent";
import ContractContent from "./ContractContent";
import DatePersonaleContent from "./DatePersonaleContent";
import EvaluariProfesori from "./Evaluari/EvaluariProfesori";
import ListaProfesoriContent from "./ListaProfesoriContent";
import NoteContent from "./NoteContent";
import OrarPersonalContent from "./OrarPersonalContent";
import OrarExamene from "./OrarExamene";
import RegulamentContent from "./RegulamentContent";
import StatisticiContent from "./StatisticiContent";
import {Route,useHistory} from "react-router";
import {motion} from 'framer-motion';
import Logo from '../../../files/images/ubbLogo2.png';
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'15%',
    },
    animatedDiv:{
        borderRadius: 30,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    }

}));
const StudentDashboard = (props) =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const [loading,setLoading]=useState(true);
    const timer = React.useRef();
    const classes=useStyles();
    useEffect(()=>{
        setLoading(true);
        timer.current = window.setTimeout(() => {
            setLoading(false);
            }, 2100);
        return () => {
            clearTimeout(timer.current);
        };
    },[])

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
    if(loading){
        return(
            <div>
                <NavBar onLogout={props.onLogout}/>
                <div className={classes.root}>
                    <motion.img
                        className={classes.animatedDiv}
                        animate={{
                            scale: [1, 2, 2, 1, 1],
                            rotate: [0, 0, 360, 360, 0],
                            borderRadius: ["20%", "20%", "30%", "30%", "20%"]
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.5, 0.8, 1],
                            loop: loading,
                            repeatDelay: 1
                        }}
                        src={Logo}/>
                </div>
            </div>
        );
    }
    return (
        <div>
            <NavBar onLogout={props.onLogout}/>
            <Route path="/studentdash/student" >
                <HomeContent/>
            </Route>
            <Route path="/studentdash/contract">
                <ContractContent/>
            </Route>
            <Route path="/studentdash/datepersonale">
                <DatePersonaleContent/>
            </Route>
            <Route path="/studentdash/evaluariprof">
                <EvaluariProfesori/>
            </Route>
            <Route path="/studentdash/listaprof">
                <ListaProfesoriContent/>
            </Route>
            <Route path="/studentdash/note">
                <NoteContent/>
            </Route>
            <Route path="/studentdash/orar">
                <OrarPersonalContent/>
            </Route>
            <Route path="/studentdash/orarexamene">
                <OrarExamene/>
            </Route>
            <Route path="/studentdash/regulament">
                <RegulamentContent/>
            </Route>
            <Route path="/studentdash/statistici">
                <StatisticiContent/>
            </Route>
        </div>
    );
};

export default StudentDashboard;