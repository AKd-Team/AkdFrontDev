import React from "react";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

const LoginScreen = (props) =>{
    return(
        <div>
            <Link to="/studentdash/student">
           <Button onClick={props.onLogin}>
               Login
           </Button>
            </Link>
        </div>
    );
};

export default LoginScreen;