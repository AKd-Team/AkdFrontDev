import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import getData from "../Helpers/ExameneData";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import styles from "./CSS/OrarStyles";
import {
    Appointments,
    AppointmentTooltip,
    Scheduler,
    Toolbar,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "react-reveal";
import {Container, Select} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import {ViewState} from "@devexpress/dx-react-scheduler";
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(7),
        marginLeft:theme.spacing(7),
        minWidth: 150,
    },
    selectContainer:{
        marginTop:'4%',
        marginLeft: '4%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const OrarExamene = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const [loading,setLoading]=useState(false);
    const [currentDate,setCurrentDate]=useState('2020-12-14');
    const [ScheduleData,setScheduleData]=useState();
    const classes = useStyles();

    const sesiune=[
        {id:1,text:'Saptamana 1',value:'2021-01-18'},
        {id:2,text:'Saptamana 2',value:'2021-01-25'},
        {id:3,text:'Saptamana 3',value:'2021-02-01'}
    ]

    async function getExameneData(id,token){
        setLoading(true);
        let ExameneData=[];
        let URL=`http://localhost:4000/student/examene/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.get(URL,config)
            .then(function (response) {

                for(let i=0;i<response.data.length;i++){
                    ExameneData.push(response.data[i])
                }
                setLoading(false);
                setScheduleData(getData(ExameneData));
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });
    }
    useEffect(()=>{
        getExameneData(User.id,User.token);
    },[])
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
    const timer = React.useRef();
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
    return(
        <React.Fragment>
            <Fade bottom>
                <Container fluid className={classes.selectContainer}>
                    <Grid container>
                        <React.Fragment>
                            <h1>Examene programate</h1>
                        </React.Fragment>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="saptLabel"><h5>Saptamana din sesiune</h5></InputLabel>
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

export default OrarExamene;