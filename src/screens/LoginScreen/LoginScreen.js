import React from "react";
import {Button} from "semantic-ui-react";

const LoginScreen = (props) =>{
    return(
        <div>
           <Button onClick={props.onLogin}>
               Login
           </Button>
        </div>
    );
};

export default LoginScreen;