import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import * as Transition from "react-reveal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Button, CircularProgress, Select} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {DataGrid} from "@material-ui/data-grid";
import createRows from "../Helpers/RowsCreator";
const useStyles = makeStyles((theme) => ({
    root:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

        display: 'flex',
        flexWrap: 'wrap',

    },
    formControl: {
        marginRight: theme.spacing(7),
        minWidth: '80%',
        marginTop:theme.spacing(2),
        border:6,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    grid:{
        height: 400,
        width:'90%',
        marginLeft: 70,
        marginRight:70,
    },
    dialog:{
        display: 'flex',
        flexWrap: 'wrap',
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
        color: 'blue',
        margin: 10,
        borderColor: 'blue',
        border: 'thick',
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
    listbutton:{
        marginLeft: 10,
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
    chart:{
        marginLeft:50,
        marginRight:50,
    },
    select:{
        marginLeft:theme.spacing(20),
        marginRight:50,
        marginTop:40,
    },
    title:{
        marginTop:'5%',
        marginLeft:'5%',
    }
}));
const ContractContent=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const classes=useStyles();

    const [loading,setLoading]=useState(false);

    const [semestru,setSemestru]=useState(0);

    const [contract,setContract]=useState([])
    const [rows,setRows]=useState([]);
    const semestre=[
        {key:1,text: 'Semestrul 1',value:1},
        {key:2,text: 'Semestrul 2',value:2},
        {key:3,text: 'Semestrul 3',value:3},
        {key:4,text: 'Semestrul 4',value:4},
        {key:5,text: 'Semestrul 5',value:5},
        {key:6,text: 'Semestrul 6',value:6},
    ]
    const columns = [
        { field: 'Nume', headerName: 'Nume', width: 400 },
        { field: 'Promovat', headerName: 'Promovat', width: 200 },
    ];

    async function getContract(){
        setLoading(true);
        var axios = require('axios');
        var data = '';

        var config = {
            method: 'get',
            url: `http://localhost:4000/student/GetContractStud/${User.id}/${semestru}`,
            headers: {
                'Authorization': `Bearer ${User.token}`
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setLoading(false);
                let data=[];
                for(let i=0;i<response.data.length;i++){
                    data.push(response.data[i])
                }
                setRows(createRows(data));
            })
            .catch(function (error) {
                //setLoading(false);
                console.log(error);
            });

    }
    const onChangeSemestru=(e)=>{
        setSemestru(e.target.value);
    }
    useEffect(()=>{
        if(semestru!=0)
            getContract();
    },[semestru])
    useEffect(()=>{
        if(User!=null){
            if(User.tipUtilizator==="student"){

            }
            else {
                history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
            }
        }
        else{
            history.push("/");
        }
    },[])
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Transition.Fade top>
                        <div className={classes.paper}><h1>Contract</h1></div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={12}>
                    <Transition.Fade left>
                        <div className={classes.paper}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="semestru-select-label"><h2>Selectati semestrul</h2></InputLabel>
                                <Select
                                    labelId="semestru-select-label"
                                    id="semestru-simple-select"
                                    value={semestru}
                                    disabled={loading}
                                    onChange={onChangeSemestru}
                                    input={<Input />}
                                >
                                    {semestre.map((sem) => (
                                        <MenuItem key={sem.key} value={sem.value}>
                                            {sem.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={12}>
                    <Transition.Fade left>
                        <div className={classes.paper}><h2>Materiile din semestrul ales</h2></div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={12}>
                    <Transition.Fade right>
                        <Paper className={classes.paper}>
                            {loading && <CircularProgress size={70}/>}
                            {!loading &&
                            <div className={classes.grid}>
                                <DataGrid loading={loading} columns={columns} rows={rows}

                                          />
                            </div>
                            }
                        </Paper>
                    </Transition.Fade>
                </Grid>
            </Grid>
        </div>
    );

};

export default ContractContent;