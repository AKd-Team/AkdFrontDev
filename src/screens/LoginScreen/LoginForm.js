import React, {useState} from "react";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({
    center:{
        margin: 'auto',
        width: '26%'

    },
    root: {
        padding: '2px 4px',
        borderRadius: 35,
        display: 'flex',
        alignItems:'center',
        width: 400,
        marginBottom: '5%',
        border: '2px solid #004276',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 2,
    },
    iconButton: {
        padding: 15,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    loginButton: {
        borderRadius: 35,
        marginLeft: '40%',
        color: '#004276',
        display: 'flex',
        alignItems:'center',
    },
    loginBtnText:{
        color:'white',
        fontWeight: 'bold'
    }
}));




function LoginForm({ Login, error }) {
    const[details, setDetails]=useState({username:"", password:""});

    const submitHandler = e =>{
        e.preventDefault();
        Login(details);
    }

    const classes = useStyles();

    return(
<form onSubmit={submitHandler}>
            <div className={classes.center} >
                {/*error*/}
                <Paper component="form"  className={classes.root} >
                    <PersonIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Username"
                        onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
                </Paper>

                <Paper component="form" className={classes.root}>
                    <LockIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Password"
                        type={"password"}
                        onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>

                </Paper>
                <div>
                    <Button variant="contained" size="large" color="primary" className={classes.loginButton} type={"submit"}  >
                       <text className={classes.loginBtnText}>login</text>
                    </Button>
                </div>
            </div>
</form>


    );
}

export default LoginForm;