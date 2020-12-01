import React, {useEffect, useState} from 'react';
import StudentDashboard from "./screens/StudentDashboard/ContentComponents/StudentDashboard";
import TeacherDashboard from "./screens/TeacherDashboard/TeacherDashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import AdminDashboard from "./screens/AdminDashboard/ContentComponents/AdminDashboard";
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Switch} from "react-router-dom";
import Footer from './Footer';

const App = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false);

    const onLogin=()=>{
        setisAuthenticated(true);
    }

    function onLogout() {
        localStorage.clear();
        setisAuthenticated(false);
    }


    return (
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => (
                    <LoginScreen {...props} onLogin={onLogin} />
                )}/>
                <Route path="/studentdash" render={(props) => (
                    <StudentDashboard {...props} onLogout={onLogout}/>
                )} />

                <Route path="/teacherdash" render={(props) => (
                    <TeacherDashboard {...props} onLogout={onLogout}/>
                )}/>

                <Route path="/admindash" render={(props) => (
                    <AdminDashboard {...props} onLogout={onLogout} />
                )}/>
            </Switch>
            <Footer />
        </Router>

    );

}
export default App;

