import React, {useEffect, useState} from 'react';
import NavBar from "../NavigationComponents/NavBar";
import HomeContent from "./HomeContent";
import CreareContStudent from "./CreareContStudent";
import CreareContProf from "./CreareContProf";
import EditareCatalog from "./EditareCatalog";
import EditareRegulament from "./EditareRegulament";
import EditareCalendar from "./EditareCalendar";
import {Route} from "react-router";



const AdminDashboard = (props) =>{
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