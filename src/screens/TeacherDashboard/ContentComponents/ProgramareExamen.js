import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useHistory} from "react-router";
import clsx from 'clsx';
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import {Button, Select} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import getData from "../Helpers/OcupareSaliExamene";
import * as Transition from 'react-reveal';
import SaveIcon from '@material-ui/icons/Save';
import Slide from "@material-ui/core/Slide";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:'5%'
    },
    formControl: {
        marginRight: theme.spacing(7),
        minWidth: '50%',
        marginLeft:theme.spacing(7),
        border:6,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        overflow:'visible'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: 10,
        marginLeft:10,
    },
    typography: {
        padding: theme.spacing(2),
    },
}));
const TransitionDialog = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const ProgramareExamen=()=>{
    const formatiiMock=[
        {id:1,text:'311',value:'311'},
        {id:2,text:'312',value:'312'},
        {id:3,text:'313',value:'313'},
        {id:4,text:'321',value:'321'},
        {id:5,text:'322',value:'322'},
        {id:6,text:'323',value:'323'},
        {id:7,text:'331',value:'331'},
        {id:8,text:'332',value:'332'},
    ]
    const [success, setSuccess] = React.useState(false);
    const classes = useStyles();
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const history=useHistory();

    const [loading,setLoading]=useState(false);
    const [sali,setSali]=useState([]);
    const [salaCrt,setSalaCrt]=useState('');
    const [oraInceput,setOraInceput]=useState();
    const [oraSfarsit,setOraSfarsit]=useState();
    const [formatie,setFormatie]=useState('');
    const [formatii,setFormatii]=useState([]);
    const [materii,setMaterii]=useState([]);
    const [dataExamen,setDataExamen]=useState(new Date());
    const [eroareFormatiiData,setEroareFormatiiData]=useState(false);
    const [crtyear,setCrtYear]=useState();
    const [materia,setMateria]=useState('');
    const [ScheduleData,setScheduleData]=useState([]);

    const timer = React.useRef();
    const User=JSON.parse(localStorage.getItem("user"));
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [required,setRequired]=useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpenConfirmation = (e) => {
        if(required===true)
            setOpenConfirmation(true);
        else setAnchorEl(e.currentTarget);
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClosePopOver = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;


    useEffect(()=>{
        if(User!=null){
            if(User.tipUtilizator==="profesor"){

            }
            else {
                history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
            }
        }
        else{
            history.push("/");
        }
        setCrtYear(new Date().getFullYear());
    },[])
    async function getMateriiData(id,token){
        setLoading(true);
        axios.get("http://localhost:4000/profesor/"+`${id}`+"/materii/", {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then((response) => {
                let listaMaterii = [];
                response.data.forEach((materie) => {
                    listaMaterii.push({
                        key: materie.idMaterie,
                        text: materie.nume,
                        value: materie.idMaterie,
                    })
                });
                setMaterii(listaMaterii);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    async function getSaliData(token){
        setLoading(true);
        let saliData=[];
        let URL=`http://localhost:4000/profesor/sali`;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.get(URL,config)
            .then(function (response) {
                for(let i=0;i<response.data.length;i++){
                    saliData.push(response.data[i])
                }
                setLoading(false);
                setSali(saliData)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function getFormatii(token){
        setLoading(true);
        let formatiiData=[];
        let URL=`http://localhost:4000/profesor/getFormatii`;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.get(URL,config)
            .then(function (response) {
                for(let i=0;i<response.data.length;i++){
                    formatiiData.push(response.data[i])
                }
                setLoading(false);
                //console.log(formatiiData);
                setFormatii(formatiiData)
            })
            .catch(function (error) {
                setEroareFormatiiData(true);
                console.log(error);
            });
    }
    useEffect(()=>{
        // console.log(salaCrt);
        //console.log(formatie);
        // console.log(dataExamen)
        // console.log(oraInceput);
        // console.log(oraSfarsit);
        if(materia!==''&&salaCrt!==''&&formatie!==''&&oraInceput!==''&&oraSfarsit!==''&&dataExamen!=='')
            setRequired(true);
        else setRequired(false);
    },[salaCrt,formatie,oraInceput,oraSfarsit,dataExamen,materia])
    const getOcupareSala=async (idSala,token)=>{
        let OcupareSalaData=[];
        let URL=`http://localhost:4000/profesor/orarSali/${idSala}`;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.get(URL,config)
            .then(function (response) {

                for(let i=0;i<response.data.length;i++){
                    OcupareSalaData.push(response.data[i])
                }
                setLoading(false);
                console.log(getData(OcupareSalaData));
                setScheduleData(getData(OcupareSalaData));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        if(salaCrt!=='')
            getOcupareSala(salaCrt,User.token);
    },[salaCrt])
    useEffect(()=>{
        //setFormatii(formatiiMock);
        getFormatii(User.token);
        getSaliData(User.token);
        getMateriiData(User.id,User.token);
    },[])
    const onChangeSalaCrt = (e) =>{
        setSalaCrt(e.target.value);
    }
    const onChangeFormatie = (e) =>{
        setFormatie(e.target.value);
    }
    const onChangeOraInceput = (e) =>{
        setOraInceput(e.target.value);
    }
    const onChangeOraSfarsit = (e) =>{
        setOraSfarsit(e.target.value);
    }
    const onChangeMateria = (e) =>{
        setMateria(e.target.value);
    }

    const FreeDate = date =>{
        for(let i=0;i<ScheduleData.length;i++){
            if(date.getDate()===ScheduleData[i].day&&date.getFullYear()===ScheduleData[i].year&&date.getMonth()===ScheduleData[i].month)
                return false;
        }
        return true;
    }
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = async () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(async () => {
                let month=dataExamen.getMonth()+1;
                let day=dataExamen.getDate();
                let Month;
                let Day;
                if(month<10)
                    Month="0"+month.toString();
                else Month=month.toString();
                if(day<10)
                    Day="0"+day.toString();
                else Day=day.toString();
                console.log("Luna:"+Month);
                console.log("Ziua:"+Day);
                console.log(dataExamen.getFullYear().toString()+"-"+Month+"-"+Day);
                let requestData={
                    "OraInceput": oraInceput,
                    "OraSfarsit": oraSfarsit,
                    "IdMaterie": materia,
                    "IdProfesor": User.id,
                    "IdFormatie": formatie,
                    "IdSala": salaCrt,
                    "Data": dataExamen,
                }
                console.log(requestData);
                var axios = require('axios');
                var data = JSON.stringify(requestData);

                var config = {
                    method: 'post',
                    url: 'http://localhost:4000/profesor/ProgExamen',
                    headers: {
                        'Authorization': `Bearer ${User.token}`,
                        'Content-Type': 'application/json'
                    },
                    data : data
                };

                await axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        console.log("Succes")
                                setSuccess(true);
                                setLoading(false);
                                timer.current=window.setTimeout(()=>{
                                    setOpenConfirmation(false);
                                    setSuccess(false)
                                },2000)
                    })
                    .catch(function (error) {
                        console.log(error);
                        setLoading(false);
                    });

            }, 1000);
        }
    };
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Transition.Fade top>
                    <Paper className={classes.paper}><h1>Programare Examen</h1></Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={4}>
                    <Transition.Fade left>
                    <Paper className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="sala-select-label"><h3>Sala</h3></InputLabel>
                            <Select
                                labelId="sala-select-label"
                                id="sala-simple-select"
                                value={salaCrt}
                                disabled={loading}
                                onChange={onChangeSalaCrt}
                                input={<Input />}
                            >
                                {sali.map((sala) => (
                                    <MenuItem key={sala.id} value={sala.idSala}>
                                        {sala.nume}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={4}>
                    <Transition.Fade right>
                    <Paper className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="formatie-select-label"><h3>Formatie</h3></InputLabel>
                            <Select
                                labelId="formatie-select-label"
                                id="formatie-simple-select"
                                error={eroareFormatiiData}
                                value={formatie}
                                disabled={loading}
                                onChange={onChangeFormatie}
                                input={<Input />}
                            >
                                {formatii.map((formatie) => (
                                    <MenuItem key={formatie.idFormatie} value={formatie.idFormatie}>
                                        {formatie.grupa}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={4}>
                    <Transition.Fade right>
                        <Paper className={classes.paper}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="materie-select-label"><h3>Materia</h3></InputLabel>
                                <Select
                                    labelId="materie-select-label"
                                    id="materie-simple-select"
                                    error={eroareFormatiiData}
                                    value={materia}
                                    disabled={loading}
                                    onChange={onChangeMateria}
                                    input={<Input />}
                                >
                                    {materii.map((materia) => (
                                        <MenuItem key={materia.id} value={materia.value}>
                                            {materia.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={4}>
                    <Transition.Fade left>
                    <Paper className={classes.paper}>
                        <h3>Data examenului</h3>
                        <DatePicker
                            closeOnScroll={true}
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date(crtyear,0,18)}
                            maxDate={new Date(crtyear,1,7)}
                            selected={dataExamen}
                            onChange={date => setDataExamen(date)}
                            disabled={loading}
                            filterDate={FreeDate}
                            placeholderText="Data examenului"
                        />
                        <h5 style={{ color: 'red' }}>Datele pe care nu le puteti alege sunt ocupate de alte examene!</h5>
                    </Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={4}>
                    <Transition.Fade bottom>
                    <Paper className={classes.paper}>
                        <h3>Ora de inceput a examenului</h3>
                        <TextField
                            id="time"
                            type="time"
                            defaultValue="07:30"
                            value={oraInceput}
                            onChange={onChangeOraInceput}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={4}>
                    <Transition.Fade right>
                    <Paper className={classes.paper}>
                        <h3>Ora de sfarsit a examenului</h3>
                        <TextField
                            id="time"
                            type="time"
                            defaultValue="07:30"
                            value={oraSfarsit}
                            onChange={onChangeOraSfarsit}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Paper>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Transition.Rotate bottom left>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                onClick={handleClickOpenConfirmation}
                                startIcon={<SaveIcon />}
                            >
                                Programare
                            </Button>
                        </Transition.Rotate>
                        <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClosePopOver}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>Va rog sa alegeti toate datele</Typography>
                        </Popover>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                TransitionComponent={TransitionDialog}
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Va rog confirmati datele introduse inainte de programare"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h4>Sala: {salaCrt}</h4>
                        <h4>Formatie {formatie}</h4>
                        <h4>Materia:{materia}</h4>
                        <h4>Data examenului: {dataExamen.getDate()}-{dataExamen.getMonth()+1}-{dataExamen.getFullYear()}</h4>
                        <h4>Ora inceput:{oraInceput}</h4>
                        <h4>Ora sfarsit:{oraSfarsit}</h4>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseConfirmation} color="primary">
                        Disagree
                    </Button>
                    <div className={classes.wrapper}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            className={buttonClassname}
                            onClick={handleButtonClick}
                        >
                            {success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default ProgramareExamen;