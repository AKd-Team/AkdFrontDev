import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import {Button, Divider, Form,Modal,Segment,Popup} from 'semantic-ui-react';
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import rowsCreator from "../Helpers/rowsCreator";
import {CircularProgress} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
    },
    form1:{
        marginTop: 40,
        marginLeft: 70,
        marginRight:70,
        justifyContent:'center',
        alignItems: 'center',
    },
    form2:{
        marginTop: 50,
        marginLeft: 70,
        marginRight:70,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    bttnGroup:{
        marginTop: 50,
        marginLeft: 'auto',
        marginRight:'auto',
        justifyContent:'center',
        alignItems: 'center'
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        width:20,
        height:20,
        marginTop: -12,
        marginLeft: -12,
    },
    grid:{
        height: 400,
        width:'90%',
        marginLeft: 70,
        marginRight:70,
    },
    title:{
        alignContent:'center',
        marginTop:'4%',
        marginLeft:'10%',

    }
}));
const NoteContent = () =>{
    const classes=useStyles();
    const history=useHistory();
    const timeoutLength = 2000;
    const User=JSON.parse(localStorage.getItem("user"));
    const [error,setError]=useState(false);
    const [openError,setOpenError]=useState(false);
    const [materii,setMaterii]=useState([]);
    const [loading,setLoading]=useState(false);
    const [loadingStud,setLoadingStud]=useState(false);
    const [materie,setMaterie]=useState('');
    const [student,setStudent]=useState();
    const [idStudent,setidStudent]=useState();
    const [isMaterie,setisMaterie]=useState(true);
    const [cheieMaterie,setCheieMaterie]=useState('');
    const [dateMaterii,setDateMaterii]=useState([]);
    const [studentiMaterie,setStudentiMaterie]=useState([]);
    const [open,setOpen]=useState(false);
    const [tipulNotei,setTipulNotei]=useState('');
    const [nota,setNota]=useState();
    const [rows,setRows]=useState([]);
    const [dateStudenti,setDateStudenti]=useState([]);
    const note=[
        {key:1,text:'1',value:1},
        {key:2,text:'2',value:2},
        {key:3,text:'3',value:3},
        {key:4,text:'4',value:4},
        {key:5,text:'5',value:5},
        {key:6,text:'6',value:6},
        {key:7,text:'7',value:7},
        {key:8,text:'8',value:8},
        {key:9,text:'9',value:9},
        {key:10,text:'10',value:10},
    ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 400 },
        { field: 'Nume', headerName: 'Nume', width: 400 },
        { field: 'Grupa', headerName: 'Grupa', width: 200 },
    ];
    // const rows=[
    //     { id: 1, Nume:'Ionut Mihai'},
    //     { id: 2, Nume:'Costina Bianca'},
    //     { id: 3, Nume:'George Marian'},
    //     { id: 4, Nume:'Rares Handaric'},
    //     { id: 5, Nume:'Ana Munteanu'},
    //     { id: 6, Nume:'Ionut Mihai'},
    // ]
    const tipuriNotei=[
        {key:1,text:'Sesiune',value:'Sesiune'},
        {key:2,text:'Restanta',value:'Restanta'},
    ]
    const timer = React.useRef();
    const onOpen=()=>{
        console.log(error);
        if(!error){
            setOpen(true);
        }
        else {
            setOpenError(true);
            timer.current = window.setTimeout(() => {
                setOpenError(false)
            }, timeoutLength);
        }
        return () => {
            clearTimeout(timer.current);
        };
    }
    const onClose=()=>{
        setOpen(false);
    }
    const getMaterii= async (User)=>{
        setLoading(true)
        await axios.get("http://localhost:4000/profesor/"+`${User.id}`+"/materii/", {
            headers: {
                'Authorization': `token ${User.token}`
            }
        })
            .then((response) => {
                let listaMaterii = [];
                setDateMaterii(response.data);
                response.data.forEach((materie) => {
                    listaMaterii.push({
                        key: materie.idMaterie,
                        text: materie.nume,
                        value: materie.nume
                    })
                    //console.log(materie.idMaterie);
                    setLoading(false);
                });
                setMaterii(listaMaterii);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(()=>{
        if(materie===''||student===''||nota===''||tipulNotei===''){
            setError(true);
            console.log("S-a ajuns pe true")
        }
        if(materie!==''&&student!==''&&nota!==''&&tipulNotei!==''){
            console.log("S-a ajuns pe false")
            setError(false);
        }

    },[student,nota,tipulNotei])

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
        getMaterii(User);
    },[])
    const getStudenti = async (User) =>{
        setLoadingStud(true);
        await axios.get("http://localhost:4000/profesor/StudFaraNote/"+`${cheieMaterie}`, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        })
            .then((response) => {
                let listaStudenti = [];
                setDateStudenti(response.data);
                setRows(rowsCreator(response.data));
                response.data.forEach((student) => {
                    listaStudenti.push(
                        {
                            key: student.idStudent,
                            text: student.nume+" "+student.prenume+" "+student.grupa,
                            value: student.idStudent
                        });
                });
                setStudentiMaterie(listaStudenti);
                setLoadingStud(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(()=>{
        if(materie!==''){
            getStudenti(User);
            setisMaterie(false);
        }
        else {
            setisMaterie(true);
            setStudentiMaterie([]);
            setRows(rowsCreator([]))
        }
    },[materie])
    const onChangeMaterie =(e,{value})=>{

        setMaterie(value);
        for(let i=0;i<dateMaterii.length;i++)
        {
            if(dateMaterii[i].nume===value)
            {
                setCheieMaterie(dateMaterii[i].idMaterie)
                return;
            }
        }
    }
    useEffect(()=>{
       console.log(student);
       console.log(idStudent);
    },[student,idStudent])
    const onChangeStudent =(value)=>{
        setidStudent(value);
        for(let i=0;i<dateStudenti.length;i++)
        {
            if(dateStudenti[i].idStudent===value)
            {
                setStudent(dateStudenti[i].nume+" "+dateStudenti[i].prenume+" "+dateStudenti[i].grupa)
                return;
            }
        }
    }

    const onChangeTipulNotei= (e,{value})=>{
        setTipulNotei(value);
    }
    const onChangeNota= (e,{value})=>{
        setNota(value);
    }
    const onSubmit = async () =>{
        setLoading(true);
        var axios = require('axios');
        let tip;
        tip = tipulNotei === "Restanta";
        var data = JSON.stringify({
            "IdStudent":parseInt(idStudent, 10),
            "IdMaterie":cheieMaterie,
            "Nota":nota,
            "Restanta":tip,
        });
        console.log(data);
        var config = {
            method: 'put',
            url: 'http://localhost:4000/profesor/AdaugareNote',
            headers: {
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                getStudenti(User);
                setLoading(false);
                setOpen(false);
                console.log(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });

    }
    return(
        <div className={classes.root} >
            <div className={classes.title}>
                <h1>Adaugare note</h1>
            </div>
            <Form className={classes.form1} loading={loading} >
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        label='Materia'
                        clearable
                        fluid
                        upward
                        selection
                        options={materii}
                        onChange={onChangeMaterie}
                        placeholder='Alegeti materia'
                        required={true}
                    />
                </Form.Group>
            </Form>
            <div className={classes.grid}>
                <DataGrid loading={loadingStud} columns={columns} rows={rows}
                          onSelectionChange={(newSelection) => {
                    setidStudent(newSelection.rowIds[0]);
                    const id=newSelection.rowIds[0];
                    for(let i=0;i<dateStudenti.length;i++)
                    {
                        if(dateStudenti[i].idStudent==id)
                        {
                            setStudent(dateStudenti[i].nume+" "+dateStudenti[i].prenume+" "+dateStudenti[i].grupa)
                        }
                    }
                }}/>
            </div>
            <Form className={classes.form2}>
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        label='Nota'
                        clearable
                        fluid
                        selection
                        options={note}
                        disabled={isMaterie}
                        onChange={onChangeNota}
                        placeholder='Alegeti nota'
                        required={true}
                    />
                    <Form.Dropdown
                        label='Tipul Notei'
                        clearable
                        fluid
                        selection
                        options={tipuriNotei}
                        disabled={isMaterie}
                        onChange={onChangeTipulNotei}
                        placeholder='Alegeti tipul notei'
                        required={true}
                    />
                    <Popup
                        trigger={<Button content="Submit" disabled={isMaterie} onClick={onOpen}/>}
                        content={`Va rugam alegeti toate campurile inainte de submit `}
                        on='click'
                        open={openError}
                        position='right'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                </Form.Group>
            </Form>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Va rog confirmati ca ati introdus nota studentului corect</Modal.Header>
                <Modal.Content >
                    <Modal.Description>
                        <h4>Materia: {materie}</h4>
                        <h4>Studentul cu id-ul : {student}</h4>
                        <h4>Nota : {nota}</h4>
                        <h4>Tipul notei :{tipulNotei}</h4>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {loading && <CircularProgress size={68} className={classes.fabProgress}/>}
                    <Button color='black' onClick={onClose}>
                       Cancel
                    </Button>
                    <Button
                        content="Confirm"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={onSubmit}
                        positive={!loading}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default NoteContent;