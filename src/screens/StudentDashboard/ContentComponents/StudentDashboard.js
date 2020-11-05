import React, {useState} from 'react';
import NavBar from "../NavigationComponents/NavBar";
import Route from "../NavigationComponents/Route";
import {Home} from "@material-ui/icons";
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

const StudentDashboard = () =>{

    return (
        <div>
            <NavBar/>
            <Route path="/">
                <HomeContent/>
            </Route>
            <Route path="/contract">
                <ContractContent/>
            </Route>
            <Route path="/datepersonale">
                <DatePersonaleContent/>
            </Route>
            <Route path="/evaluariprof">
                <EvaluariProfesori/>
            </Route>
            <Route path="/listaprof">
                <ListaProfesoriContent/>
            </Route>
            <Route path="/note">
                <NoteContent/>
            </Route>
            <Route path="/orar">
                <OrarPersonalContent/>
            </Route>
            <Route path="/orarexamene">
                <OrarExamene/>
            </Route>
            <Route path="/regulament">
                <RegulamentContent/>
            </Route>
            <Route path="/statistici">
                <StatisticiContent/>
            </Route>

        </div>

    );
};

export default StudentDashboard;