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
    const materii=[
        {id:1,text:'Inteligenta Artificiala',value:'Inteligenta Artificiala'},
        {id:2,text:'MPP',value:'MPP'},
        {id:3,text:'MAP',value:'MAP'},
        {id:4,text:'Algoritmi si programare',value:'Algoritmi si programare'},
        {id:5,text:'Not selected',value:'null'}
    ]

    const data={
        "Inteligenta Artificiala": [
            { nota: "1", studenti: 50 },
            { nota: "2", studenti: 100 },
            { nota: "3", studenti: 30 },
            { nota: "4", studenti: 107 },
            { nota: "5", studenti: 47 },
            { nota: "6", studenti: 72 },
            { nota: "7", studenti: 98 },
            { nota: "8", studenti: 110 },
            { nota: "9", studenti: 54},
            { nota: "10", studenti: 30 },

        ],
        "MPP": [
            { nota: "1", studenti: 50 },
            { nota: "2", studenti: 100 },
            { nota: "3", studenti: 30 },
            { nota: "4", studenti: 107 },
            { nota: "5", studenti: 95 },
            { nota: "6", studenti: 157 },
            { nota: "7", studenti: 49 },
            { nota: "8", studenti: 120 },
            { nota: "9", studenti: 83},
            { nota: "10", studenti: 129 },
        ],
        "MAP": [
            { nota: "1", studenti: 50 },
            { nota: "2", studenti: 100 },
            { nota: "3", studenti: 30 },
            { nota: "4", studenti: 107 },
            { nota: "5", studenti: 95 },
            { nota: "6", studenti: 157 },
            { nota: "7", studenti: 49 },
            { nota: "8", studenti: 120 },
            { nota: "9", studenti: 83},
            { nota: "10", studenti: 129 },
        ],
        "Algoritmi si programare": [
            { nota: "1", studenti: 50 },
            { nota: "2", studenti: 100 },
            { nota: "3", studenti: 30 },
            { nota: "4", studenti: 107 },
            { nota: "5", studenti: 95 },
            { nota: "6", studenti: 157 },
            { nota: "7", studenti: 49 },
            { nota: "8", studenti: 120 },
            { nota: "9", studenti: 83},
            { nota: "10", studenti: 129 },
        ],
        "null":[
            { nota: "1", studenti: 0 },
            { nota: "2", studenti: 0 },
            { nota: "3", studenti: 0 },
            { nota: "4", studenti: 0 },
            { nota: "5", studenti: 0 },
            { nota: "6", studenti:0 },
            { nota: "7", studenti: 0 },
            { nota: "8", studenti: 0 },
            { nota: "9", studenti: 0},
            { nota: "10", studenti: 0 },
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
        if(materia==='null'){
            setStats(data[materia]);
        }
        else {
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setStats(data[materia]);
                setLoading(false);
            }, 1500);
        }
        return () => {
            clearTimeout(timer.current);
        };
    },[materia])
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
                                    <MenuItem key={materie.id} value={materie.value}>
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

                        <ValueScale name="studenti" />


                        <ArgumentAxis />
                        <ValueAxis scaleName="studenti" showGrid={false} showLine showTicks />

                        <BarSeries
                           name="Studentii care au avut nota respectiva"
                           valueField="studenti"
                           argumentField="nota"
                           scaleName="studenti"
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