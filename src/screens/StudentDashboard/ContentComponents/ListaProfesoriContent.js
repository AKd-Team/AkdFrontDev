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
    {field: 'grad', headerName: 'Grad', width: 230, headerClassName: 'theme-header'},
    {
        field: 'mail',
        headerName: 'E-mail',
        width: 240,
        sortable: false,
        headerClassName: 'theme-header'
    },
    {
        field: 'site',
        headerName: 'Site Web',
        width: 250,
        sortable: false,
        headerClassName: 'theme-header onHover',
    },
    {field: 'facultate', headerName: 'Facultate', width: 280, headerClassName: 'theme-header'},
    {field: 'departament', headerName: 'Departament', width: 150, headerClassName: 'theme-header'},
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
        maxWidth: 1502,
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

const ListaProfesoriContent = () => {
    const timer = React.useRef();
    const history = useHistory();
    const User = JSON.parse(localStorage.getItem("user"));

    const [departamente, setDepartamente] = useState([]);
    const [facultati, setFacultati] = useState([]);
    const [profesori, setProfesori] = useState([]);
    const [date, setDate] = useState([]);

    const [profesoriFiltrati, setProfesoriFiltrati] = useState([]);
    const [departamentSelectat, setDepartament] = useState('');
    const [facultateSelectata, setFacultate] = useState('');

    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    if (User != null) {
        if (User.tipUtilizator === "student") {

        } else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
        }
    } else {
        history.push("/");
    }


    //request facultati si departamente
    useEffect(() => {
        axios.get("http://localhost:4000/student/listaFacultati/", {
            headers: {
                'Authorization': `token ${User.token}`
            }
        })
            .then((response) => {
                let listaFacultati = [];
                setDate(response.data)
                response.data.forEach((facultate) => {
                    listaFacultati.push({
                        key: facultate.numeFacultate,
                        text: facultate.numeFacultate,
                        value: facultate.numeFacultate
                    })
                });
                setFacultati(listaFacultati);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    //request profesori
    useEffect(() => {
        timer.current = window.setTimeout(async () => {
            await axios.get("http://localhost:4000/student/profesor/", {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            })
                .then((response) => {
                    let listaProfesori = [];
                    response.data.forEach((profesor) => {
                        listaProfesori.push(
                            {
                                id: profesor.id,
                                username: profesor.username,
                                nume: profesor.nume,
                                prenume: profesor.prenume,
                                cnp: profesor.cnp,
                                tipUtilizator: profesor.tipUtilizator,
                                mail: profesor.mail,
                                grad: profesor.grad,
                                departament: profesor.departament,
                                facultate: profesor.facultate,
                                site: profesor.site
                            });
                    });
                    setProfesori(listaProfesori);
                    setProfesoriFiltrati(listaProfesori);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });

        }, 2100);
        return () => {
            clearTimeout(timer.current);
        };

    }, [])

    //lista departamente la alegerea facultatii
    useEffect(() => {
        console.log(facultateSelectata);
        if (facultateSelectata !== '' && departamentSelectat === '') {
            let listaDepartamente = [];

            const findFacultate = (element => element.numeFacultate === facultateSelectata)
            const found = date.findIndex(findFacultate)
            //console.log(date[found]);
            for (let i = 0; i < date[found].departamente.length; i++) {
                listaDepartamente.push({key: i, text: date[found].departamente[i], value: date[found].departamente[i]})
            }
            setDepartamente(listaDepartamente);
        }
        if (facultateSelectata === '') {
            setProfesoriFiltrati(profesori);
        }
    }, [facultateSelectata])

    //filter useEffect
    useEffect(() => {
        let listaProfesori = profesori.filter((profesor) => FilterOptions(profesor));
        setProfesoriFiltrati(listaProfesori);
    }, [facultateSelectata, departamentSelectat])

    const FilterOptions = (profesor) => {
        if (facultateSelectata !== '' && departamentSelectat === '')
            return profesor.facultate === facultateSelectata;

        if (facultateSelectata !== '' && departamentSelectat !== '')
            return profesor.facultate === facultateSelectata && profesor.departament === departamentSelectat;
    }

    const onChangeFacultate = (e, {value}) => {
        setFacultate(value)
    }

    const onChangeDepartament = (e, {value}) => {
        setDepartament(value)
    }

    return (
        <div className={classes.root}>
            <Transition.Fade bottom cascade>
                <div className={classes.header}>
                    <h2>Lista profesori</h2>
                    <Divider/>
                </div>
                <Form className={classes.form}>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            label='Facultatea'
                            clearable
                            fluid
                            upward
                            selection
                            options={facultati}
                            placeholder='Alegeti facultatea'
                            required={true}
                            onChange={onChangeFacultate}
                        />
                        <Form.Dropdown
                            label='Departament'
                            clearable={true}
                            fluid
                            upward
                            selection
                            options={departamente}
                            required={false}
                            placeholder='Alegeti departamentul'
                            onChange={onChangeDepartament}
                        />
                    </Form.Group>

                </Form>
                <div className={classes.tabel} style={{height: ((Math.max(profesoriFiltrati.length + 1, 5)) * 52.8)}}>
                    <DataGrid
                        components={{
                            loadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={loading}
                        hideFooterPagination={true}
                        hideFooterSelectedRowCount={true}
                        hideFooterRowCount={true}
                        hideFooter={true}
                        rows={profesoriFiltrati}
                        columns={columns}
                        pageSize={profesoriFiltrati.length}
                    />
                </div>
            </Transition.Fade>
        </div>
    );
};

export default ListaProfesoriContent;