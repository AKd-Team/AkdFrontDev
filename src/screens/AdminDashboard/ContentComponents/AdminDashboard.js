import React, {useEffect, useState} from 'react';
import NavBar from "../NavigationComponents/NavBar";
import HomeContent from "./HomeContent";
import CreareContStudent from "./CreareContStudent";
import CreareContProf from "./CreareContProf";
import EditareCatalog from "./EditareCatalog";
import EditareRegulament from "./EditareRegulament";
import EditareCalendar from "./EditareCalendar";

import GuardedRoute from "../../../GuardedRoute";

const AdminDashboard = (props) =>{
    useEffect(()=>{
        window.history.pushState({},'','/studentdash')
    },[])
    return (
        <div>
            <NavBar onLogout={props.onLogout}/>
            <GuardedRoute path="/admindash/admin" isAuth={props.isAuth}>
                <HomeContent/>
            </GuardedRoute>
            <GuardedRoute path="/admindash/creare-cont-student" isAuth={props.isAuth}>
                <CreareContStudent />
            </GuardedRoute>
            <GuardedRoute path="/admindash/creare-cont-profesor" isAuth={props.isAuth}>
                <CreareContProf />
            </GuardedRoute>
            <GuardedRoute path="/admindash/editare-catalog" isAuth={props.isAuth}>
                <EditareCatalog/>
            </GuardedRoute>
            <GuardedRoute path="/admindash/editare-regulament" isAuth={props.isAuth}>
                <EditareRegulament/>
            </GuardedRoute>
            <GuardedRoute path="/admindash/editare-calendar" isAuth={props.isAuth}>
                <EditareCalendar/>
            </GuardedRoute>
        </div>

    );
};

export default AdminDashboard;