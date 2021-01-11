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
    const style=styles();
    const User=JSON.parse(localStorage.getItem("user"));
    var HomeText;
    useEffect(()=>{
        if(User!=null){
            if(User.tipUtilizator==="profesor"){
               // HomeText=`This is home for ${User.username} with first name ${User.prenume} and last name ${User.prenume}`;
            }
            else {
                history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
            }
        }
        else{
            history.push("/");
        }
    },)
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
                    <Header.Content>Resurse Profesori</Header.Content>
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
                            <h3>Resurse interne</h3>
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
                            <a href='https://infocercetare.ubbcluj.ro/' target="_blank">
                                <h4>Managementul activităţii academice/ştiinţifice UBB</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <a href='https://www.ubbcluj.ro/ro/infoubb/posturi_vacante/posturi_cercetare' target="_blank">
                                <h4>Posturi vacante în cadrul echipelor proiectelor de cercetare</h4>
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
                            <a href='http://cms.ubbcluj.ro/Account/Login' target="_blank">
                                <h4>CMSUBB / DISPOZIȚIA RECTORULUI</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <a href='https://www.ubbcluj.ro/ro/staff/resurse_umane.php' target="_blank">
                                <h4> Evaluarea performanțelor profesionale individuale ale personalului didactic auxiliar și nedidactic</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Fade left>
                            <a href='https://www.scs.ubbcluj.ro/webmail/' target="_blank">
                                <h4>SCS Mail</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade top>
                            <a href='https://manageasist.ubbcluj.ro/' target="_blank">
                                <h4>Managementul financiar al proiectelor instituționale</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                    <Grid.Column>
                        <Fade right>
                            <a href='https://www.ubbcluj.ro/ro/staff/recrutare_selectie/' target="_blank">
                                <h4>Recrutarea, selecția și promovarea personalului didactic auxiliar și nedidactic</h4>
                            </a>
                        </Fade>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default HomeContent;