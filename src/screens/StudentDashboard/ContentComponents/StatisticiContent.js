import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import {CircularProgress, Select} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    root:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
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
    formControl: {
        marginRight: theme.spacing(7),
        minWidth: 150,
    },
    title:{
        marginTop:'4%',
        marginLeft:'4%',
    }
}));
const StatisticiContent = () =>{
    const history=useHistory();
    const classes=useStyles();
    const [materii,setMaterii]=useState([]);
    const materiiMock=[
        {id:1,text:'Inteligenta Artificiala',value:'Inteligenta Artificiala'},
        {id:2,text:'Not selected',value:'null'}
    ]

    const data={
        "null":[
            { nota: "1", Nrstudenti: 0 },
            { nota: "2", Nrstudenti: 0 },
            { nota: "3", Nrstudenti: 0 },
            { nota: "4", Nrstudenti: 0 },
            { nota: "5", Nrstudenti: 0 },
            { nota: "6", Nrstudenti:0 },
            { nota: "7", Nrstudenti: 0 },
            { nota: "8", Nrstudenti: 0 },
            { nota: "9", Nrstudenti: 0},
            { nota: "10",Nrstudenti: 0 },
        ]
    };
    const onChangeMateria = (e)=>{
        setMateria(e.target.value);
    }
    const [stats,setStats]=useState(data["null"]);
    const [materia,setMateria]=useState('null');
    const [loading,setLoading]=useState(false);
    const User=JSON.parse(localStorage.getItem("user"));
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
    }
    ,[])
    const timer = React.useRef();
    useEffect(()=>{
        console.log(materia)
        if(materia==='null'){
            setStats(data[materia]);
        }
        else {
            setLoading(true);
            timer.current = window.setTimeout(async () => {
                await axios.get("http://localhost:4000/student/materii/statistici"+`${materia}`, {
                    headers: {
                        'Authorization': `token ${User.token}`
                    }
                })
                    .then((response) => {
                        let data = [];
                        response.data.forEach((stats) => {
                            data.push({
                                nota: stats.nota,
                                Nrstudenti: stats.nrStudenti,
                            })
                        });
                        console.log(data);
                        setStats(data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 1000);
        }
        return () => {
            clearTimeout(timer.current);
        };
    },[materia])
    useEffect(()=>{
        setLoading(true);
        axios.get("http://localhost:4000/student/materii/"+`${User.id}`, {
            headers: {
                'Authorization': `token ${User.token}`
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
                console.log(listaMaterii);
                let max;
                if(listaMaterii.length!==0)
                     max = listaMaterii.reduce((prev, current) => (prev.key > current.key) ? prev : current);
                else max=1;
                listaMaterii.push({
                    key: max,
                    text: 'Not selected',
                    value: 'null',
                })
                setLoading(false);
                setMaterii(listaMaterii);
            })
            .catch((error) => {
                console.log(error);
            });

    },[])
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <div className={classes.title}>
                        <h1>Statistici note studenti pentru materia selectata</h1>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.select}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Materia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={materia}
                                onChange={onChangeMateria}
                                input={<Input />}
                            >
                                {materii.map((materie) => (
                                    <MenuItem key={materie.key} value={materie.value}>
                                        {materie.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.select}>
                    {loading && <CircularProgress />}
                    </div>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.chart}>

                    <Chart
                        data={stats}
                    >

                        <ValueScale name="Nrstudenti" />


                        <ArgumentAxis />
                        <ValueAxis scaleName="Nrstudenti" showGrid={false} showLine showTicks />

                        <BarSeries
                           name="Studentii care au avut nota respectiva"
                           valueField="Nrstudenti"
                           argumentField="nota"
                           scaleName="Nrstudenti"
                        />

                        <Animation />

                     <Legend />

                    </Chart>
                </Paper>
                </Grid>

            </Grid>
        </div>
    );
};

export default StatisticiContent;