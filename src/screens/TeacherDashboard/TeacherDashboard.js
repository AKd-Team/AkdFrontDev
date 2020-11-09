import React from 'react';
import NavBar from "./NavigationComponents/NavBar";
import HomeContent from "./ContentComponents/HomeContent";
import OrarPersonalizatContent from "./ContentComponents/OrarPersonalizat";
import OrarExamene from "./ContentComponents/OrarExamene";
import ListaStudenti from "./ContentComponents/ListaStudenti";
import OcupareSali from "./ContentComponents/OcupareSali";
import ProgramareExamen from "./ContentComponents/ProgramareExamen";
import AdaugareNote from "./ContentComponents/AdaugareNote";
import Evaluari from "./ContentComponents/Evaluari";
import Statistici from "./ContentComponents/Statistici";
import {Route} from "react-router";

const TeacherDashboard = (props) =>{

    return (
        <div>
            <NavBar onLogout={props.onLogout}/>
            <Route path="/teacherdash/teacher">
                <HomeContent/>
            </Route>

            <Route path="/teacherdash/orarPersonalizat" >
                <OrarPersonalizatContent/>
            </Route>
            <Route path="/teacherdash/orarExamene" >
                <OrarExamene/>
            </Route>

            <Route path="/teacherdash/listaStudenti" >
                <ListaStudenti/>
            </Route>

            <Route path="/teacherdash/ocupareSali" >
                <OcupareSali/>
            </Route>
            <Route path="/teacherdash/programareExamen" >
                <ProgramareExamen/>
            </Route>

            <Route path="/teacherdash/adaugareNote" >
                <AdaugareNote/>
            </Route>

            <Route path="/teacherdash/evaluari" >
                <Evaluari/>
            </Route>

            <Route path="/teacherdash/statistici" >
               <Statistici/>
            </Route>
        </div>
    );
};

export default TeacherDashboard;