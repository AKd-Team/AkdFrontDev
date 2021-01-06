import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useHistory} from "react-router";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import getData from "../Helpers/OcupareSaliExamene";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:'2%'
    },
    formControl: {
        marginRight: theme.spacing(7),
        minWidth: 300,
        marginLeft:theme.spacing(7),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
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
    const history=useHistory();
    const classes = useStyles();
    const [loading,setLoading]=useState(false);
    const [sali,setSali]=useState([]);
    const [salaCrt,setSalaCrt]=useState('');
    const [oraInceput,setOraInceput]=useState();
    const [oraSfarsit,setOraSfarsit]=useState();
    const [formatie,setFormatie]=useState('');
    const [formatii,setFormatii]=useState([]);
    const [dataExamen,setDataExamen]=useState(new Date());
    const [eroareFormatiiData,setEroareFormatiiData]=useState(false);
    const [crtyear,setCrtYear]=useState();
    const [ScheduleData,setScheduleData]=useState([]);
    const User=JSON.parse(localStorage.getItem("user"));
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
    },[salaCrt,formatie,oraInceput,oraSfarsit,dataExamen])
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
    const FreeDate = date =>{
        for(let i=0;i<ScheduleData.length;i++){
            if(date.getDate()===ScheduleData[i].day&&date.getFullYear()===ScheduleData[i].year&&date.getMonth()===ScheduleData[i].month)
                return false;
        }
        return true;
    }
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><h1>Programare Examen</h1></Paper>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
            </Grid>
        </div>
    );

};

export default ProgramareExamen;