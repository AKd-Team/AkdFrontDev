import React, {useState} from 'react';
import StudentDashboard from "./screens/StudentDashboard/ContentComponents/StudentDashboard";
import TeacherDashboard from "./screens/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
const App = () =>{
    const [crtPage,setCrtPage]=useState('studentdash');
    if(crtPage==='loginscreen'){
        return <LoginScreen />
    }
    if(crtPage==='studentdash'){
        return <StudentDashboard />;
    }
    if(crtPage=='teacherdash'){
        return <TeacherDashboard />
    }
    if(crtPage==='admindash'){
        return <AdminDashboard />
    }
};

export default App;