import React,{useEffect,useState} from "react";
import {useHistory} from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import {
    Appointments,
    AppointmentTooltip,
    Scheduler,
    Toolbar,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Fade from "react-reveal";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../StudentDashboard/ContentComponents/CSS/OrarStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import getData from "../Helpers/OcupareSaliData";
import {ViewState} from "@devexpress/dx-react-scheduler";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Select} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(7),
        minWidth: 150,
        marginLeft:theme.spacing(7),
    },
    selectContainer:{
        marginTop:'4%',
        marginLeft: '3%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    title:{
        marginLeft:'4%',
    }
}));




const OcupareSali = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const [loading,setLoading]=useState(false);
    const [currentDate,setCurrentDate]=useState('2020-12-14');
    const [salaCrt,setSalaCrt]=useState('');
    const [ScheduleData,setScheduleData]=useState();
    const [sali,setSali]=useState([]);
    const classes = useStyles();

    // const sali=[
    //     {id:1,nume:'FSEGA 320'},
    //     {id:2,nume:'FSEGA 400'},
    //     {id:3,nume:'KOGAL 3/I'},
    //     {id:4,nume:'KOGAL 2/I'},
    //     {id:5,nume:'FSEGA 500'},
    // ]
    const sesiune=[
        {id:1,text:'Saptamana 1',value:'2021-01-18'},
        {id:2,text:'Saptamana 2',value:'2021-01-25'},
        {id:3,text:'Saptamana 3',value:'2021-02-01'}
    ]

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
    useEffect(()=>{
        getSaliData(User.token)
    },[])
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
        //setScheduleData(getData());
        //getInitialData(User.id,User.token);
    },[])
    const timer = React.useRef();
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
        console.log(salaCrt);
        setLoading(true);
        timer.current = window.setTimeout(() => {
            getOcupareSala(salaCrt,User.token);
            setLoading(false);
        }, 2100);
        return () => {
            clearTimeout(timer.current);
        };
    },[salaCrt])
    const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
        ({ children, classes, ...restProps }) => (
            <div className={classes.toolbarRoot}>
                <Toolbar.Root {...restProps}>
                    {children}
                </Toolbar.Root>
                <LinearProgress className={classes.progress} />
            </div>
        ),
    );
    const onChangeCurrentDate =(e)=>{
       setCurrentDate(e.target.value);
    }
    const onChangeSalaCrt = (e) =>{
        setSalaCrt(e.target.value);
    }
    return(
        <React.Fragment>
            <Fade bottom>
                <Container fluid className={classes.selectContainer}>
                <Grid container>
                    <div className={classes.title}>
                        <h1>Calendarul salilor ocupate de examene</h1>
                    </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Sala</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                    <FormControl className={classes.formControl}>
                        <InputLabel id="saptLabel">Saptamana din sesiune</InputLabel>
                        <Select
                            labelId="saptLabel"
                            id="sapt-simple-select"
                            value={currentDate}
                            disabled={loading}
                            onChange={onChangeCurrentDate}
                            input={<Input />}
                        >
                            {sesiune.map((item) => (
                                <MenuItem key={item.id} value={item.value}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                </Container>
                <Paper>
                    <Scheduler
                        height={660}
                        data={ScheduleData}
                    >
                        <ViewState
                            currentDate={currentDate}
                            onCurrentDateChange={onChangeCurrentDate}
                        />
                        <WeekView
                            startDayHour={8}
                            endDayHour={20}
                            excludedDays={[0,6]}
                        />

                        <Appointments  />
                        <Toolbar
                            {...loading ? { rootComponent: ToolbarWithLoading } : null}
                        />
                        <AppointmentTooltip/>
                    </Scheduler>
                </Paper>
            </Fade>
        </React.Fragment>
    );
};

export default OcupareSali;