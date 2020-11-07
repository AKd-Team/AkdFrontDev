import {useState,useEffect} from 'react';
import LoginScreen from "./screens/LoginScreen/LoginScreen";

const GuardedRoute = ( {path,children,isAuth})=>{
    const [currentPath,setCurrentPath] = useState(window.location.pathname);

    useEffect(()=>{
        const onLocationChange = () =>{
            setCurrentPath(window.location.pathname);
        }
        window.addEventListener('popstate',onLocationChange);

        return ()=>{
            window.removeEventListener('popstate',onLocationChange);
        }
    },[]);
    if(isAuth){
        return currentPath === path ? children :null;
    }
    else return <LoginScreen/>
};

export default GuardedRoute;