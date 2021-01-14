import React, {useEffect, useState} from 'react';
import NavBar from "./NavigationComponents/NavBar";
import HomeContent from "./ContentComponents/HomeContent";
import OrarPersonalizatContent from "./ContentComponents/OrarPersonalizat";
import OrarExamene from "./ContentComponents/OrarExamene";
import ListaStudenti from "./ContentComponents/ListaStudenti";
import OcupareSali from "./ContentComponents/OcupareSali";
import ProgramareExamen from "./ContentComponents/ProgramareExamen";
import AdaugareNote from "./ContentComponents/AdaugareNote";
import Evaluari from "./ContentComponents/VizualizareEvaluari/Evaluari";
import Statistici from "./ContentComponents/Statistici";
import {Route} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {motion} from "framer-motion";
import Logo from "../../files/images/ubbLogo2.png";
const useStyles = makeStyles(() => ({
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
const TeacherDashboard = (props) =>{
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
            <Route path="/profesordash/profesor">
                <HomeContent/>
            </Route>

            <Route path="/profesordash/orarPersonalizat" >
                <OrarPersonalizatContent/>
            </Route>
            <Route path="/profesordash/orarExamene" >
                <OrarExamene/>
            </Route>

            <Route path="/profesordash/listaStudenti" >
                <ListaStudenti/>
            </Route>

            <Route path="/profesordash/ocupareSali" >
                <OcupareSali/>
            </Route>
            <Route path="/profesordash/programareExamen" >
                <ProgramareExamen/>
            </Route>

            <Route path="/profesordash/adaugareNote" >
                <AdaugareNote/>
            </Route>

            <Route path="/profesordash/evaluari" >
                <Evaluari/>
            </Route>

            <Route path="/profesordash/statistici" >
               <Statistici/>
            </Route>
        </div>
    );
};

export default TeacherDashboard;