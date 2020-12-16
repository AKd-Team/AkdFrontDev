import React, {useEffect,useState} from "react";
import {useHistory} from "react-router";
import Paper from '@material-ui/core/Paper';
import {
    Scheduler,
    WeekView,
    Toolbar,
    Appointments,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import getData from '../Helpers/OrarDataCreator';
import Fade from 'react-reveal';
import axios from "axios";
import styles from './CSS/OrarStyles';
const OrarPersonalContent=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));

    const [ScheduleData,setScheduleData]=useState([]);
    const [loading,setLoading]=useState(false);
    async function getInitialData(id,token){
        setLoading(true);
        let initialData=[];
        let URL=`http://localhost:4000/student/orar/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.get(URL,config)
            .then(function (response) {

                for(let i=0;i<response.data.length;i++){
                    initialData.push(response.data[i])
                }
                setLoading(false);
                setScheduleData(getData(initialData));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        getInitialData(User.id,User.token);
    },[])
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
    return(
    <Fade bottom>
        <Paper>
            <Scheduler
                height={660}
                data={ScheduleData}
            >
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
    );
};

export default OrarPersonalContent;