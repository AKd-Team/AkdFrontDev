import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import * as Transition from "react-reveal";
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {green} from "@material-ui/core/colors";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Button, CircularProgress, Select} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Slide from "@material-ui/core/Slide";
import CreateIcon from '@material-ui/icons/Create';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
    root:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

        display: 'flex',
        flexWrap: 'wrap',

    },
    formControl: {
        marginRight: theme.spacing(7),
        minWidth: '80%',
        marginTop:theme.spacing(2),
        border:6,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    dialog:{
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        overflow:'visible'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        color: 'blue',
        margin: 10,
        borderColor: 'blue',
        border: 'thick',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    listbutton:{
      marginLeft: 10,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: 10,
        marginLeft:10,
    },
    typography: {
        padding: theme.spacing(2),
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
    title:{
        marginTop:'5%',
        marginLeft:'5%',
    }
}));
const TransitionDialog = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const EditareCatalog = () =>{
    const timer = React.useRef();
    const history=useHistory();
    const classes=useStyles();
    const User=JSON.parse(localStorage.getItem("user"));

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [canadd,setCanAdd]=useState(true);
    const [succes,setSucces]=useState(false);


    const [crtMat,setCrtMat]=useState({
            idMaterie: 0,
            nume: "",
            cod: "",
            nrCredite: 0,
            descriere: "",
            finalizare: "",
            nrPachet: 0,
            tipActivitate: 1,
        }
    );
    const [openInfo,setOpenInfo]=useState(false);
    const [openEdit,setOpenEdit]=useState(false);
    const [openAdd,setOpenAdd]=useState(false);
    const [openMsg,setOpenMsg]=useState(false);

    const [specializari,setSpecializari]=useState([]);
    const [materii,setMaterii]=useState([])

    const [specializare,setSpecializare]=useState(0);
    const [numeMat,setNumeMat]=useState('');
    const [codMat,setCodMat]=useState('');
    const [idMat,setIdMat]=useState(0);
    const [nrCrediteMat,setNrCrediteMat]=useState(0);
    const [descriereMat,setDescriereMat]=useState('');
    const [finalizareMat,setFinalizareMat]=useState('');
    const [nrPachetMat,setNrPachetMat]=useState(0);
    const [tipActivitate,setTipActivitate]=useState(0);
    const [semestru,setSemestru]=useState(0);

    const tipactivitati = [
        {key:1,text:"1 Obligatorie"},
        {key:2,text:"2 Opțională"},
        {key:3,text:"3 Altă disciplină obligatorie"},
        {key:4,text:"4 Facultativă"}
    ]
    const finalizari=[
        {key:1,text:'E (examen)',value:'E'},
        {key:2,text:'V (verificare pe parcurs)',value:'V'},
        {key:3,text:'C (colocviu)',value:'C'},
    ]
    const semestre=[
        {key:1,text: 'Semestrul 1',value:1},
        {key:2,text: 'Semestrul 2',value:2},
        {key:3,text: 'Semestrul 3',value:3},
        {key:4,text: 'Semestrul 4',value:4},
        {key:5,text: 'Semestrul 5',value:5},
        {key:6,text: 'Semestrul 6',value:6},
    ]

    async function getSpecializari(){
        setError(false);
        setLoading(true);
        var axios = require('axios');
        var data = '';
        var config = {
            method: 'get',
            url: `http://localhost:4000/admin/getSpecializari/${User.id}`,
            headers: {
                'Authorization': `Bearer ${User.token}`
            },
            data : data
        };
        axios(config)
            .then(function (response) {
                setLoading(false);
                setSpecializari(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            });
    }
    async function getMaterii(){
        setLoading(true);
        var axios = require('axios');
        var data = '';

        var config = {
            method: 'get',
            url: `http://localhost:4000/admin/GetMaterii/${specializare}`,
            headers: {
                'Authorization': `Bearer ${User.token}`
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                timer.current=window.setTimeout(() => {
                    setLoading(false);
                    setMaterii(response.data)
                }, 1000);
                console.log(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            });

    }

    useEffect(()=>{
        if(User!=null){
            if(User.tipUtilizator==="admin"){
            }
            else {
                history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
            }
        }
        else{
            history.push("/");
        }
        getSpecializari();
    },[])
    useEffect(()=>{
        if(specializare!=0)
            setCanAdd(false);
        else setCanAdd(true);
        getMaterii();
    },[specializare])
    const onChangeSpecializare= (e) =>{
        setSpecializare(e.target.value);
    }
    const onChangeNumeMat = (e) =>{
        setNumeMat(e.target.value);
    }
    const onChangeCodMat = (e) =>{
        setCodMat(e.target.value);
    }
    const onChangeNrCrediteMat = (e) =>{
        setNrCrediteMat(e.target.value);
    }
    const onChangeDescriere= (e) =>{
        setDescriereMat(e.target.value);
    }
    const onChangeFinalizareMat = (e)=>{
        setFinalizareMat(e.target.value);
    }
    const onChangeNrPachetMat = (e) =>{
        setNrPachetMat(e.target.value);
    }
    const onChangeTipActivitateMat =(e)=>{
        setTipActivitate(e.target.value);
    }
    const onChangeSemestru = (e) =>{
        setSemestru(e.target.value);
    }
    const OnSubmit = async () => {
        setError(false);
        setLoading(true);
        var axios = require('axios');
        var data = JSON.stringify({
            "Nume":numeMat,
            "Cod":codMat,
            "NrCredite":parseInt(nrCrediteMat,10),
            "Descriere":descriereMat,
            "Finalizare":finalizareMat,
            "NrPachet":parseInt(nrPachetMat,10),
            "TipActivitate":tipActivitate,
        });
       // console.log(data);

        var config = {
            method: 'post',
            url: 'http://localhost:4000/admin/addMaterie',
            headers: {
                'Authorization':`Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                getIdMaterie();
            })
            .catch(function (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            });


        // console.log(numeMat);
        // console.log(codMat);
        // console.log(nrCrediteMat);
        // console.log(descriereMat);
        // console.log(finalizareMat);
        // console.log(nrPachetMat);
        // console.log(tipActivitate);
    }

    async function getIdMaterie(){
        var axios = require('axios');
        var data = '';
        var config = {
            method: 'get',
            url: `http://localhost:4000/admin/getIdMaterie/${numeMat}/${codMat}/${finalizareMat}/${nrPachetMat}/${tipActivitate}`,
            headers: {
                'Authorization':`Bearer ${User.token}`
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                addMatSpec(parseInt(response.data,10));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    async function addMatSpec(id){
        var axios = require('axios');
        console.log(idMat);
        var data = JSON.stringify({
            "IdSpecializare":specializare,
            "IdMaterie":id,
            "Semestru":semestru,
        });
        // console.log(data);

        var config = {
            method: 'post',
            url: 'http://localhost:4000/admin/AddMatSpec',
            headers: {
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                getMaterii();
                setSucces(response);
                timer.current=window.setTimeout(()=>{
                    handleCloseAdd();
                    setLoading(false);
                    setError(false);
                },2000)
            })
            .catch(function (error) {
                setSucces(error);
                setError(true);
                handleCloseAdd();
                setLoading(false);
                console.log(error);
            });

    }
    const onOpenInfo= () =>{
        setOpenInfo(true);
    }
    const onOpenEdit = () =>{
        setOpenEdit(true);
    }
    const onOpenAdd = () =>{
        setOpenAdd(true);
    }
    const onOpenMsg= ()=>{
        setOpenMsg(true);
    }
    const handleCloseInfo = () =>{
        setOpenInfo(false);
    }
    const handleCloseEdit = () =>{
        setOpenEdit(false);
    }
    const handleEdit = async () =>{
        setLoading(true);
        var axios = require('axios');
        var data = JSON.stringify({
            "idMaterie":crtMat.idMaterie,
            "nume":numeMat,
            "cod":codMat,
            "nrCredite":parseInt(nrCrediteMat,10),
            "descriere":descriereMat,
            "finalizare":finalizareMat,
            "nrPachet":parseInt(nrPachetMat,10),
            "tipActivitate":parseInt(tipActivitate,10),
            });
        console.log(data);

        var config = {
            method: 'put',
            url: 'http://localhost:4000/admin/EditMaterie',
            headers: {
                'Authorization':`Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                getMaterii();
                timer.current=window.setTimeout(()=>{
                    setLoading(false);
                },2000)
                setSucces(response.data);
                onOpenMsg();
                handleCloseAdd();
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                timer.current=window.setTimeout(()=>{
                    setLoading(false);
                },2000)
                setSucces(error)
                handleCloseAdd();
                setError(true);
                onOpenMsg();
                console.log(error);
            });

    }
    const handleCloseMsg= ()=>{
        setOpenMsg(false);
    }
    const handleCloseAdd= () =>{
        setNumeMat("");
        setCodMat("");
        setNrCrediteMat(0);
        setDescriereMat("");
        setFinalizareMat("");
        setNrPachetMat(0);
        setSemestru(0);
        setTipActivitate(0);
        setOpenEdit(false);
        setOpenAdd(false);
    }
    const handleDelete = async () =>{
        setLoading(true);
        var axios = require('axios');
        var data;

        var config = {
            method: 'delete',
            url: `http://localhost:4000/admin/DeleteMaterie/${crtMat.idMaterie}`,
            headers: {
                'Authorization':`Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                timer.current=window.setTimeout(()=>{
                    setLoading(false);
                },2000)
                setSucces(response.data);
                getMaterii();
                onOpenMsg();
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                timer.current=window.setTimeout(()=>{
                    setLoading(false);
                },2000)
                setSucces(error);
                setError(true);
                handleCloseAdd();
                onOpenMsg();
                console.log(error);
            });
    }
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Transition.Fade top>
                        <div className={classes.paper}><h1>Editarea,adaugarea si stergerea materiilor pentru fiecare specializare</h1></div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={6}>
                    <Transition.Fade left>
                        <div className={classes.paper}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="specializare-select-label"><h3>Selectati specializarea</h3></InputLabel>
                                <Select
                                    labelId="specializare-select-label"
                                    id="specializare-simple-select"
                                    error={error}
                                    value={specializare}
                                    disabled={loading}
                                    onChange={onChangeSpecializare}
                                    input={<Input />}
                                >
                                    {specializari.map((specializare) => (
                                        <MenuItem key={specializare.idSpecializare} value={specializare.idSpecializare}>
                                            {specializare.nume} {specializare.cod}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={6}>
                    <Transition.Fade right>
                        <div className={classes.paper}>
                            <Button disabled={canadd} className={classes.button} onClick={onOpenAdd} color="primary">
                                Adauga materie
                            </Button>
                        </div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={12}>
                    <Transition.Fade left>
                        <div className={classes.paper}><h2>Materiile pentru specializarea aleasa</h2></div>
                    </Transition.Fade>
                </Grid>
                <Grid item xs={12}>
                    <Transition.Fade right>
                        <Paper className={classes.paper}>
                            {loading && <CircularProgress size={70}/>}
                            {!loading &&
                            <List className={classes.root}>
                                {materii.map((mat) => {
                                    const numeId = `checkbox-list-label-${mat.idMaterie}`;
                                    return (
                                        <ListItem key={mat.idMaterie} role={undefined} dense button
                                                  >
                                            <ListItemIcon>
                                                <IconButton edge="start" onClick={() => {  onOpenEdit();
                                                    setNumeMat(mat.nume);
                                                    setCodMat(mat.cod);
                                                    setNrCrediteMat(mat.nrCredite);
                                                    setDescriereMat(mat.descriere);
                                                    setFinalizareMat(mat.finalizare);
                                                    setNrPachetMat(mat.nrPachet);
                                                    setTipActivitate(mat.tipActivitate);
                                                    setCrtMat(mat);}}>
                                                    <CreateIcon/>
                                                </IconButton>
                                            </ListItemIcon>
                                            <ListItemText onClick={() => { onOpenInfo(); setCrtMat(mat);}} id={numeId} primary={`${mat.nume}`} />
                                            <ListItemSecondaryAction className={classes.listbutton}>
                                                <IconButton edge="end" aria-label="comments" onClick={()=>{
                                                    setCrtMat(mat);
                                                    handleDelete();
                                                }
                                                } >
                                                   <DeleteForeverIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })
                                }
                            </List>
                            }
                        </Paper>
                    </Transition.Fade>
                </Grid>
            </Grid>
            <div>
                <Dialog
                    open={openInfo}
                    TransitionComponent={TransitionDialog}
                    keepMounted
                    onClose={handleCloseInfo}
                    aria-labelledby="info-dialog-slide-title"
                    aria-describedby="info-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Mai multe informatii despre materia aleasa"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <h4>Nume: {crtMat.nume} </h4>
                            <h4>Cod: {crtMat.cod}</h4>
                            <h4>Numar credite: {crtMat.nrCredite}</h4>
                            <h4>Descriere: {crtMat.descriere}</h4>
                            <h4>Finalizare: {crtMat.finalizare}</h4>
                            <h4>Numar pachet : {crtMat.nrPachet}</h4>
                            <h4>Tip activitate: {crtMat.tipActivitate}</h4>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseInfo} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
             <div>
               <Dialog
                    open={openMsg}
                    TransitionComponent={TransitionDialog}
                    keepMounted
                    onClose={handleCloseMsg}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{error? "A aparut o eroare": "Succes"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseMsg} color="primary">
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={openAdd || openEdit}
                    TransitionComponent={TransitionDialog}
                    keepMounted
                    onClose={handleCloseAdd}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{openEdit ? "Editeaza materia"+" "+crtMat.nume : "Adauga o materie noua"}</DialogTitle>
                    <DialogContent>
                        <form className={classes.form} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="filled-name"
                                label="Numele materiei"
                                value={numeMat}
                                onChange={onChangeNumeMat}
                                variant="filled"
                            />
                            <TextField
                                id="filled-cod"
                                label="Codul materiei"
                                value={codMat}
                                onChange={onChangeCodMat}
                                variant="filled"
                            />

                        </div>
                            <div>
                                <TextField
                                    id="filled-nrcredite"
                                    label="Numarul de credite"
                                    value={nrCrediteMat}
                                    onChange={onChangeNrCrediteMat}
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-descriere"
                                    label="Descrierea materiei"
                                    value={descriereMat}
                                    onChange={onChangeDescriere}
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-nrpachet"
                                    label="Numarul pachetului"
                                    value={nrPachetMat}
                                    onChange={onChangeNrPachetMat}
                                    variant="filled"
                                />
                                {openAdd &&
                                <TextField
                                    id="outlined-select-sem"
                                    select
                                    label="Select"
                                    value={semestru}
                                    onChange={onChangeSemestru}
                                    helperText="Selectati semestrul"
                                    variant="outlined"
                                >
                                    {semestre.map((sem) => (
                                        <MenuItem key={sem.key} value={sem.value}>
                                            {sem.text}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                }
                            </div>
                            <div>
                                <TextField
                                    id="outlined-select-tip"
                                    select
                                    label="Select"
                                    value={tipActivitate}
                                    onChange={onChangeTipActivitateMat}
                                    helperText="Selectati tipul activitatii"
                                    variant="outlined"
                                >
                                        {tipactivitati.map((tip) => (
                                            <MenuItem key={tip.key} value={tip.key}>
                                                {tip.text}
                                            </MenuItem>
                                        ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-finalizare"
                                    select
                                    label="Select"
                                    value={finalizareMat}
                                    onChange={onChangeFinalizareMat}
                                    helperText="Selectati finalizarea materiei"
                                    variant="outlined"
                                >
                                        {finalizari.map((fin) => (
                                            <MenuItem key={fin.key} value={fin.value}>
                                                {fin.text}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        {loading && <CircularProgress size={20}/>}
                        <Button onClick={handleCloseAdd} color="primary">
                            <h4>Cancel</h4>
                        </Button>
                        <Button color="primary" onClick={openEdit ? handleEdit : OnSubmit }>
                            {openEdit && <h4>Editeaza</h4>}
                            {openAdd && <h4>Adauga</h4>}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default EditareCatalog;