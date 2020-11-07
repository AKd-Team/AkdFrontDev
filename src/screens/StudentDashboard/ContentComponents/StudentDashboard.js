import React, {useEffect, useState} from 'react';
import NavBar from "../NavigationComponents/NavBar";
import HomeContent from "./HomeContent";
import ContractContent from "./ContractContent";
import DatePersonaleContent from "./DatePersonaleContent";
import EvaluariProfesori from "./EvaluariProfesori";
import ListaProfesoriContent from "./ListaProfesoriContent";
import NoteContent from "./NoteContent";
import OrarPersonalContent from "./OrarPersonalContent";
import OrarExamene from "./OrarExamene";
import RegulamentContent from "./RegulamentContent";
import StatisticiContent from "./StatisticiContent";
import Route from "../NavigationComponents/Route";
import GuardedRoute from "../../../GuardedRoute";

const StudentDashboard = (props) =>{
    useEffect(()=>{
        window.history.pushState({},'','/studentdash')
    },[])
    return (
        <div>
            <NavBar onLogout={props.onLogout}/>
            <GuardedRoute path="/studentdash/student" isAuth={props.isAuth}>
                <HomeContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/contract" isAuth={props.isAuth}>
                <ContractContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/datepersonale" isAuth={props.isAuth}>
                <DatePersonaleContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/evaluariprof" isAuth={props.isAuth}>
                <EvaluariProfesori/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/listaprof" isAuth={props.isAuth}>
                <ListaProfesoriContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/note" isAuth={props.isAuth}>
                <NoteContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/orar" isAuth={props.isAuth}>
                <OrarPersonalContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/orarexamene" isAuth={props.isAuth}>
                <OrarExamene/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/regulament" isAuth={props.isAuth}>
                <RegulamentContent/>
            </GuardedRoute>
            <GuardedRoute path="/studentdash/statistici" isAuth={props.isAuth}>
                <StatisticiContent/>
            </GuardedRoute>
        </div>

    );
};

export default StudentDashboard;