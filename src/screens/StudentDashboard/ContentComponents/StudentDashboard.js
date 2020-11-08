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
import {Route} from "react-router";

const StudentDashboard = (props) =>{
    useEffect(()=>{
        window.history.pushState({},'','/studentdash/student')
    },[])
    return (
        <div>
            <NavBar onLogout={props.onLogout}/>
            <Route path="/studentdash/student">
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