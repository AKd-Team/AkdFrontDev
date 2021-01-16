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
import Fade from 'react-reveal';
import axios from "axios";
import styles from "../../StudentDashboard/ContentComponents/CSS/OrarStyles";
import getData from "../Helpers/OrarDataCreator";
const OrarPersonalizat=()=>{
    const history=useHistory();
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
        getInitialData(User.id,User.token);
    },[])
    const [ScheduleData,setScheduleData]=useState([]);
    const [loading,setLoading]=useState(false);
    async function getInitialData(id,token){
        setLoading(true);
        let initialData=[];
        let URL=`http://localhost:4000/profesor/orar/${id}`;
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
    return(
        <Fade bottom>
            <div>
                <h1>Orar personalizat pentru {User.nume} {User.prenume}</h1>
            </div>
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

export default OrarPersonalizat;