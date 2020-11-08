import React, {useEffect, useState} from 'react';
import StudentDashboard from "./screens/StudentDashboard/ContentComponents/StudentDashboard";
import TeacherDashboard from "./screens/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import GuardedRoute from "./GuardedRoute";


const App = () =>{
    const [isAuthenticated,setisAuthenticated]=useState(false);
    const [crtUser,setCrtUser]=useState('');

   function onLogin() {
        setisAuthenticated(true);
        //setCrtUser('student');
        setCrtUser('teacher');
    }
    function onLogout() {
        setisAuthenticated(false);
        setCrtUser('');
    }

    if(crtUser===''&&isAuthenticated===false){
        return <LoginScreen onLogin={onLogin}/>
    }
    if(crtUser==='student'&&isAuthenticated===true){
        return <StudentDashboard onLogout={onLogout} isAuth={isAuthenticated}/>
    }
    if(crtUser==='teacher'&&isAuthenticated===true){
        return <TeacherDashboard onLogout={onLogout} isAuth={isAuthenticated}/>
    }


};

export default App;

