import React, {useEffect, useState} from 'react';
import Route from "./NavigationComponents/Route";
import GuardedRoute from "./../../GuardedRoute";
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

const TeacherDashboard = (props) =>{
    useEffect(()=>{
        window.history.pushState({},'','/teacherdash')
    },[])
    return (
        <div>
            <NavBar onLogout={props.onLogout}/>
            <GuardedRoute path="/teacherdash/teacher" isAuth={props.isAuth}>
                <HomeContent/>
            </GuardedRoute>

            <GuardedRoute path="/teacherdash/orarPersonalizat" isAuth={props.isAuth}>
                <OrarPersonalizatContent/>
            </GuardedRoute>
            <GuardedRoute path="/teacherdash/orarExamene" isAuth={props.isAuth}>
                <OrarExamene/>
            </GuardedRoute>

            <GuardedRoute path="/teacherdash/listaStudenti" isAuth={props.isAuth}>
                <ListaStudenti/>
            </GuardedRoute>

            <GuardedRoute path="/teacherdash/ocupareSali" isAuth={props.isAuth}>
                <OcupareSali/>
            </GuardedRoute>
            <GuardedRoute path="/teacherdash/programareExamen" isAuth={props.isAuth}>
                <ProgramareExamen/>
            </GuardedRoute>

            <GuardedRoute path="/teacherdash/adaugareNote" isAuth={props.isAuth}>
                <AdaugareNote/>
            </GuardedRoute>

            <GuardedRoute path="/teacherdash/evaluari" isAuth={props.isAuth}>
                <Evaluari/>
            </GuardedRoute>

            <GuardedRoute path="/teacherdash/statistici" isAuth={props.isAuth}>
               <Statistici/>
            </GuardedRoute>
        </div>
    );
};

export default TeacherDashboard;