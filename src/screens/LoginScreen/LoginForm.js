import React, {useState} from "react";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useHistory} from "react-router";
import {LoginUrl} from "./URL";
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Shake from 'react-reveal/Shake';
const useStyles = makeStyles((theme) => ({
    center:{
        margin: 'auto',
        width: '30%'
    },
    root: {
        padding: '2px 4px',
        borderRadius: 35,
        display: 'flex',
        alignItems:'center',
        width: '100%',
        marginBottom: '5%',
        border: '2px solid #004276',
    },
    loading:{
        margin: 'auto',
        width: '30%',
        padding: '2px 4px',
        display: 'flex',
        alignItems:'center',
        marginBottom: '5%',
    },
    errorText:{
        color : "red",
    },
    error : {
        padding: '3px 4px',
        alignItems:'center',
        display: 'flex',
        width: '100%',
        marginBottom: '5%',
        marginTop: '5%',
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
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    loginButton: {
        borderRadius: 50,
        marginLeft: '35%',
        color: '#004276',
        display: 'flex',
        alignItems:'center',
        width: '30%',
    },
    loginBtnText:{
        color:'white',
        fontWeight: 'bold'
    },

}));


function LoginForm() {
    const history=useHistory();
    const [details, setDetails]=useState({username:"", password:""});
    const [loading,setLoading]=useState(false);
    const [Error,setError]=useState(false);
    const [success, setSuccess] = useState(false);
    const timer = React.useRef();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const submitHandler = async e =>{
        e.preventDefault();
        setSuccess(false);
        setLoading(true);
        axios.post(LoginUrl, {
            username: details.username,
            password: details.password,
        })
            .then(function (response) {
                let User={
                    userId:response.data.id,
                    username:details.username,
                    firstname:response.data.prenume,
                    lastname:response.data.nume,
                    Type: response.data.tipUtilizator,
                    token:response.data.token,
                }
                console.log(response);
                 timer.current = window.setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                    localStorage.setItem("user",JSON.stringify(User));
                    history.push(`/${User.Type}dash/${User.Type}`);
                }, 1500);
                // localStorage.setItem("user",JSON.stringify(User));
                // history.push(`/${User.Type}dash/${User.Type}`);
                console.log(response);
            })
            .catch(function (error) {
                timer.current=window.setTimeout(()=>{
                    setError(true);
                    setSuccess(false);
                    setLoading(false);
                },1000);

                console.log(error);
            });
        // let User={
        //     username:details.username,
        //     firstname:details.username,
        //     lastname:details.username,
        //     Type:details.username,
        // }
        // if(User.Type==='student'||User.Type==='admin'||User.Type==='teacher'){
        //     localStorage.setItem("user",JSON.stringify(User));
        //     history.push(`/${User.Type}dash/${User.Type}`);
        // }
        // else {setError(true);
        //         setLoading(false);
        // }

    }
    const EnterPress = async e =>{
        if(e.keyCode===13){
            //e.preventDefault();
            setSuccess(false);
            setLoading(true);
            axios.post(LoginUrl, {
                username: details.username,
                password: details.password,
            })
                .then(function (response) {
                    let User={
                        username:details.username,
                        firstname:response.data.firstName,
                        lastname:response.data.lastName,
                        Type: response.data.tipUtilizator,
                        token:response.data.token,
                    }
                    timer.current = window.setTimeout(() => {
                        setSuccess(true);
                        setLoading(false);
                        localStorage.setItem("user",JSON.stringify(User));
                        history.push(`/${User.Type}dash/${User.Type}`);
                    }, 1500);
                    // localStorage.setItem("user",JSON.stringify(User));
                    // history.push(`/${User.Type}dash/${User.Type}`);
                    console.log(response);
                })
                .catch(function (error) {
                    timer.current=window.setTimeout(()=>{
                        setError(true);
                        setSuccess(false);
                        setLoading(false);
                    },1000);

                    console.log(error);
                });
        }
    };
    const classes = useStyles();

    if(Error)
        return(
            <form
            onSubmit={submitHandler}
            onKeyDown={EnterPress}
        >
            <div className={classes.center} >
                <Paper component="form"  className={classes.root} >
                    <PersonIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Username"
                        onChange={e => setDetails({...details, username: e.target.value})}
                        value={details.username}
                    />
                </Paper>

                <Paper component="form" className={classes.root}>
                    <LockIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Password"
                        type={"password"}
                        onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                    />
                </Paper>
                <div className={classes.error}>
                    <Shake>
                    <h4 className={classes.errorText}>Wrong username or password </h4>
                    </Shake>
                </div>
                <div>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.loginButton}
                        type={"submit"}
                        disabled={loading}
                    >
                        <text className={classes.loginBtnText}>login</text>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                </div>
            </div>
        </form>
        );
    return(
        <form
            onSubmit={submitHandler}
            onKeyPress={EnterPress}
        >
            <div className={classes.center} >

                <Paper component="form"  className={classes.root} >
                    <PersonIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Username"
                        onChange={e => setDetails({...details, username: e.target.value})}
                        value={details.username}
                        />
                </Paper>

                <Paper component="form" className={classes.root}>
                    <LockIcon />
                    <Divider className={classes.divider} orientation="vertical" />
                    <InputBase
                        className={classes.input}
                        placeholder="Password"
                        type={"password"}
                        onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                        />

                </Paper>
                <div>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.loginButton}
                        disabled={loading}
                        type={"submit"}  >
                       <text className={classes.loginBtnText}>login</text>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                </div>
            </div>
</form>
    );
}
export default LoginForm;