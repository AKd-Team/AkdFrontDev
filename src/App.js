import React, {useEffect, useState} from 'react';
import StudentDashboard from "./screens/StudentDashboard/ContentComponents/StudentDashboard";
import TeacherDashboard from "./screens/TeacherDashboard/TeacherDashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import AdminDashboard from "./screens/AdminDashboard/ContentComponents/AdminDashboard";
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Switch,Link} from "react-router-dom";
import {SessionContext} from "./SessionManagement/SessionContext";

const App = () => {
    const [isAuthenticated, setisAuthenticated] = useState(true);
    const [crtUser, setCrtUser] = useState('');

    useEffect(()=>{
        window.history.pushState({},'',"/");
    },[])
    function onLogout() {
       // setisAuthenticated(false);
        //setCrtUser('');
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => (
                    <LoginScreen {...props}  />
                )}/>

                <Route path="/studentdash" render={(props) => (
                    <StudentDashboard {...props} onLogout={onLogout} />
                )} />

                <Route path="/teacherdash" render={(props) => (
                    <TeacherDashboard {...props} onLogout={onLogout} />
                )}/>

                <Route path="/admindash" render={(props) => (
                    <AdminDashboard {...props} onLogout={onLogout} />
                )}/>

            </Switch>
        </Router>
    );

}
export default App;

