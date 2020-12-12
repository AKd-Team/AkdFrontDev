import React, {useEffect,useState} from "react";
import {useHistory} from "react-router";
import Paper from '@material-ui/core/Paper';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import getData from '../Helpers/OrarDataCreator';
import Fade from 'react-reveal';
const OrarPersonalContent=()=>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));

    const [ScheduleData,setScheduleData]=useState([]);

    useEffect(()=>{
        let data=getData();
        setScheduleData(data);
        console.log(data);
    },[])
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
                <Appointments />
                <AppointmentTooltip/>
            </Scheduler>
        </Paper>
    </Fade>
    );
};

export default OrarPersonalContent;