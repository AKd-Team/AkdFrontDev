import React, {useEffect, useState} from "react";
import {DataGrid, GridOverlay} from '@material-ui/data-grid';
import {useHistory} from "react-router"
import {Button, Divider, Form} from "semantic-ui-react";
import * as Transition from "react-reveal";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

const columns: Columns = [
    {field: 'nume', headerName: 'Nume', width: 170, headerClassName: 'theme-header'},
    {field: 'prenume', headerName: 'Prenume', width: 180, headerClassName: 'theme-header'},
    {field: 'grupa', headerName: 'Grupa', width: 100, headerClassName: 'theme-header'},
    {field: 'semigrupa', headerName: 'Semigrupa', width: 125, headerClassName: 'theme-header'},
    {
        field: 'mail',
        headerName: 'E-mail',
        width: 240,
        headerClassName: 'theme-header'
    },
    {field: 'specializare', headerName: 'Specializare', width: 280, headerClassName: 'theme-header'},
    {field: 'facultate', headerName: 'Facultate', width: 280, headerClassName: 'theme-header'},
];

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        '& .theme-header': {
            backgroundColor: '#3f51b5',
            color: 'white',
            fontSize: 14,
        }
    },
    form: {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: "middle"
    },
    bttnGroup: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 20
    },
    header: {
        marginTop: 30,
        marginBottom: 40,
        textAlign: 'center'
    },
    tabel: {
        width: '90%',
        maxWidth: 1375,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{position: 'absolute', top: 0, width: '100%'}}>
                <LinearProgress/>
            </div>
        </GridOverlay>
    );
}

const ListaStudenti = ( ) =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const timer = React.useRef();
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [materii,setMaterii]=useState([]);
    const [studentiMaterie,setStudentiMaterie]=useState([]);
    const [materieSelectata,setMaterie]=useState('');

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

    //request materii ale unui profesor
    useEffect(() => {
        axios.get("http://localhost:4000/profesor/"+`${User.id}`, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        })
            .then((response) => {
                let listaMaterii = [];
                response.data.forEach((materie) => {
                    listaMaterii.push({
                        key: materie.idMaterie,
                        text: materie.numeMaterie,
                        value: materie.numeMaterie
                    })
                });
                console.log(listaMaterii);
                setMaterii(listaMaterii);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    //request studenti de la o anumita materie
    useEffect(() => {
        timer.current = window.setTimeout(async () => {
            axios.get("http://localhost:4000/profesor/"+`${User.id}`+"/materii/"+`${materieSelectata.key}`, {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            })
                .then((response) => {
                    let listaStudenti = [];
                    response.data.forEach((student) => {
                        listaStudenti.push(
                            {
                                nume: student.nume,
                                prenume: student.prenume,
                                grupa: student.grupa,
                                semigrupa: student.semigrupa,
                                mail: student.mail,
                                specializare: student.specializare,
                                facultate: student.facultate,
                            });
                    });
                    console.log(listaStudenti);
                    setStudentiMaterie(listaStudenti);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 2100);
        return () => {
            clearTimeout(timer.current);
        };
    }, [materieSelectata])

    const onChangeMaterie = (e, {value}) => {
        setMaterie(value)
    }

    return (
        <div className={classes.root}>
            <Transition.Fade bottom cascade>
                <div className={classes.header}>
                    <h2>Lista studentilor pentru fiecare materie</h2>
                    <Divider/>
                </div>
                <Form className={classes.form}>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            label='Materia'
                            clearable
                            fluid
                            upward
                            selection
                            options={materii}
                            placeholder='Alegeti materia dorita'
                            required={true}
                            onChange={onChangeMaterie}
                        />
                    </Form.Group>
                </Form>
                <div className={classes.tabel} style={{height: ((Math.max(studentiMaterie.length + 1, 5)) * 52.8)}}>
                    <DataGrid
                        components={{
                            loadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={loading}
                        hideFooterPagination={true}
                        hideFooterSelectedRowCount={true}
                        hideFooterRowCount={true}
                        hideFooter={true}
                        rows={studentiMaterie}
                        columns={columns}
                        pageSize={studentiMaterie.length}
                    />
                </div>
            </Transition.Fade>
        </div>
    );
};

export default ListaStudenti;