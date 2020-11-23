import React from 'react';
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
import {Route,useHistory} from "react-router";
import Fade from 'react-reveal';
import Slide from 'react-reveal';
const StudentDashboard = (props) =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    if(User!=null){
        if(User.Type==="student"){

        }
        else {
            history.push(`/${User.Type}dash/${User.Type}`);
        }
    }
    else{
        history.push("/");
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