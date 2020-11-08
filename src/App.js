import React, {useEffect, useState} from 'react';
import StudentDashboard from "./screens/StudentDashboard/ContentComponents/StudentDashboard";
import TeacherDashboard from "./screens/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Switch,Link} from "react-router-dom";

const App = () =>{
    const [isAuthenticated,setisAuthenticated]=useState();
    const [crtUser,setCrtUser]=useState('');

   function onLogin() {
        setisAuthenticated(true);
        setCrtUser('student');
    }
    function onLogout(){
       setisAuthenticated(false);
       setCrtUser('');
    }

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <LoginScreen onLogin={onLogin}/>
                </Route>
                <Route path="/studentdash">
                    <StudentDashboard onLogout={onLogout} isAuth={isAuthenticated}/>
                </Route>
            </Switch>
        </Router>
    );


};

export default App;

