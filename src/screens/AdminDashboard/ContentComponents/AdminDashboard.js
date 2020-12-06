import React, {useEffect, useState} from 'react';
import NavBar from "../NavigationComponents/NavBar";
import HomeContent from "./HomeContent";
import CreareContStudent from "./CreareContStudent";
import CreareContProf from "./CreareContProf";
import EditareCatalog from "./EditareCatalog";
import EditareRegulament from "./EditareRegulament";
import EditareCalendar from "./EditareCalendar";
import {Route} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {motion} from "framer-motion";
import Logo from "../../../files/images/ubbLogo2.png";
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
const AdminDashboard = (props) =>{
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
            <Route path="/admindash/admin" >
                <HomeContent/>
            </Route>
            <Route path="/admindash/creare-cont-student" >
                <CreareContStudent />
            </Route>
            <Route path="/admindash/creare-cont-profesor" >
                <CreareContProf />
            </Route>
            <Route path="/admindash/editare-catalog" >
                <EditareCatalog/>
            </Route>
            <Route path="/admindash/editare-regulament" >
                <EditareRegulament/>
            </Route>
            <Route path="/admindash/editare-calendar" >
                <EditareCalendar/>
            </Route>
        </div>

    );
};
export default AdminDashboard;