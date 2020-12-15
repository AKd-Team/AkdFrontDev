import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Divider, Header, Icon, Image, Segment,Grid} from 'semantic-ui-react'
import {makeStyles} from "@material-ui/core/styles";
import {motion} from "framer-motion";
import {useAnimation} from "framer-motion";
import Fade from 'react-reveal';
import {Link} from 'react-router-dom';
const styles = makeStyles((theme) => ({
    root:{
        //justifyContent: 'center',
        alignContent: 'center',
        margin:'4%',
    },
    photo:{
      marginLeft: '3%',
      marginRight: '3%',
    },
}));
const HomeContent = () =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    var HomeText;
    const style=styles();
    useEffect(()=>{
        if(User!=null){
            if(User.tipUtilizator==="student"){
                HomeText=`This is home for ${User.username} with first name ${User.prenume} and last name ${User.nume}`;
            }
            else {
                history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
            }
        }
        else{
            history.push("/");
        }
    },[])
    const header = useAnimation()
    header.start({
        x:"4%",
        transition: { duration: 2 },
    })
    return(
        <Segment className={style.root}>
            <motion.div
                animate={header}
                >
                <Header as='h2'>
                    <Icon name='university'/>
                    <Header.Content>Universitatea Babes-Bolyai</Header.Content>
                </Header>
            </motion.div>
            <Fade left big>
                <Divider/>
            </Fade>
            <motion.div className={style.photo}>
                <Fade>
                    <Image
                        src="https://files.primariaclujnapoca.ro/universitate/MG_0437_Universitatea-Babes-Bolyai.jpg"
                        fluid
                        href='https://www.ubbcluj.ro/ro/'
                        target='_blank'
                        rounded
                    />
                </Fade>
            </motion.div>
            <Fade right big>
                <Divider/>
            </Fade>
            <motion.div
                animate={header}
            >
                <Header as='h2'>
                    <Icon name='archive'/>
                    <Header.Content>Resurse Studenti</Header.Content>
                </Header>
            </motion.div>
            <Fade right big>
                <Divider/>
            </Fade>
            <Grid textAlign='center' columns={3} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Fade left>
                            <h3>Facilitati IT</h3>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade top>
                            <h3>Invatamant</h3>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <h3>Campus</h3>
                        </Fade>
                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Grid.Column>
                        <Fade left>
                            <a href='https://login.microsoftonline.com/' target="_blank">
                            <h4>Portal Microsoft</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade top>
                            <a href='https://www.ubbcluj.ro/ro/studenti/invatamant/structura_anului_universitar' target="_blank">
                                <h4>Structura anului universitar</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <a href='https://www.ubbcluj.ro/ro/studenti/campus/spatii_cazare' target="_blank">
                                <h4>Spatii de cazare</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Fade left>
                            <a href='https://outlook.office365.com/' target="_blank">
                                <h4>Outlook Mail</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade top>
                            <a href='https://www.ubbcluj.ro/ro/studenti/burse/regulament_burse' target="_blank">
                                <h4>Regulament burse</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <a href='https://www.ubbcluj.ro/ro/studenti/cantine/' target="_blank">
                                <h4>Cantine si cafeterii</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Fade left>
                            <a href='https://www.scs.ubbcluj.ro/webmail/' target="_blank">
                                <h4>Stud Mail</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade top>
                            <a href='https://www.ubbcluj.ro/ro/taxe/plata_taxelor' target="_blank">
                                <h4>Plata taxelor</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <a href='https://www.ubbcluj.ro/ro/studenti/campus/spatii_cazare#cazare_regulamente' target="_blank">
                                <h4>Regulamente privind cazarea</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default HomeContent;