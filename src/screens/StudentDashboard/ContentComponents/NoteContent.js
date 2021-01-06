import React, {useEffect, useState} from "react";
import {DataGrid, GridOverlay} from '@material-ui/data-grid';
import {useHistory} from "react-router"
import {Button, Divider, Form} from "semantic-ui-react";
import * as Transition from "react-reveal";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

const columns: Columns = [
    {field: 'id', headerName: 'Nr Crt', width: 95, headerClassName: 'theme-header centerHeader'},
    {field: 'anStudiu', headerName: 'An studiu', width: 120, headerClassName: 'theme-header'},
    {field: 'semestruPlan', headerName: 'Semestru', width: 120, headerClassName: 'theme-header'},
    {field: 'codDisciplina', headerName: 'Cod disciplina', width: 150, headerClassName: 'theme-header'},
    {field: 'disciplina', headerName: 'Denumire Disciplina', width: 260, headerClassName: 'theme-header'},
    {field: 'notaSesiune', headerName: 'Nota Sesiune', width: 145, headerClassName: 'theme-header'},
    {field: 'notaRestanta', headerName: 'Nota Restanta', width: 150, headerClassName: 'theme-header'},
    {field: 'notaFinala', headerName: 'Nota Finala', width: 130, headerClassName: 'theme-header'},
    {field: 'nrCredite', headerName: 'Nr Credite', width: 125, headerClassName: 'theme-header'},
    {field: 'dataPromovarii', headerName: 'Data promovarii', width: 160, headerClassName: 'theme-header'}
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
        maxWidth: 1455,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontSize: 35
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

const NoteContent = () =>{
    const timer = React.useRef();
    const history = useHistory();
    const User = JSON.parse(localStorage.getItem("user"));

    const [note, setNote] = useState([]);
    const [noteFiltrate, setNoteFiltrate] = useState([]);
    const [aniStudiu, setAniStudiu] = useState([]);
    const [semestre, setSemestre] = useState([]);
    const [anStudiuSelectat, setAnStudiu] = useState('');
    const [semestruSelectat, setSemestru] = useState('');

    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    if(User!=null){
        if(User.tipUtilizator==="student"){

        }
        else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
        }
    }
    else {
        history.push("/");
    }

    //request note
    useEffect(() => {
        timer.current = window.setTimeout(async () => {
            await axios.get("http://localhost:4000/student/note/"+`${User.id}`, {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            })
            .then((response) => {
                let listaNote = [];
                let listaAniStudiu=[];
                let listaAniStudiuDropdown=[];
                let listaSemestreDropdown=[];
                let crt=0;
                response.data.forEach((inregistrare) => {
                    crt++;
                    listaNote.push({
                        id: crt,
                        anStudiu: inregistrare.anStudiu,
                        semestruPlan: inregistrare.semestruPlan,
                        codDisciplina: inregistrare.codDisciplina,
                        disciplina: inregistrare.disciplina,
                        notaSesiune: inregistrare.notaSesiune!=null?inregistrare.notaSesiune:"-",
                        notaRestanta: inregistrare.notaRestanta!=null?inregistrare.notaRestanta:"-",
                        notaFinala: inregistrare.notaFinala!=null?inregistrare.notaFinala:"-",
                        nrCredite: inregistrare.nrCredite,
                        dataPromovarii: inregistrare.dataPromovarii,
                    })
                    if(!ElementulExista(inregistrare.anStudiu,listaAniStudiu)) {
                        listaAniStudiu.push(inregistrare.anStudiu);
                    }
                });
                listaAniStudiu.sort();

                //-----------pregatire liste dropdown
                for(let i=0;i<listaAniStudiu.length;i++)
                {
                    listaAniStudiuDropdown.push({
                        key: listaAniStudiu[i],
                        text: listaAniStudiu[i],
                        value: listaAniStudiu[i]
                    })
                }

                for(let semestru=1;semestru<=2*listaAniStudiu.length;semestru++)
                {
                    listaSemestreDropdown.push({
                        key: semestru,
                        text: semestru,
                        value: semestru
                    })
                }
                //---------------------------------------

                setNote(listaNote);
                setNoteFiltrate(listaNote);
                setAniStudiu(listaAniStudiuDropdown);
                setSemestre(listaSemestreDropdown);

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

    const ElementulExista = (elementCautat:string,lista:[]):boolean => {
        for(let i=0;i<lista.length;i++)
        {
            if(lista[i]===elementCautat)
            {
                return true;
            }
        }
        return false;
    }
    const ValidareAnSemestruSelectat = ():boolean => {
        if(semestruSelectat===(anStudiuSelectat*2) || semestruSelectat===(anStudiuSelectat*2-1))
            return true;
        return false;
    }

    //filter useEffect
    useEffect(() => {
        console.log(note);
        if(anStudiuSelectat!=='' || semestruSelectat!=='') {
            if((anStudiuSelectat!=='' && semestruSelectat!=='') )
            {
                    console.log("Anul si semstrul nu corespund! Alege din nou.");
            }
            let listaNote = note.filter((inregistrare) => FilterOptions(inregistrare));
            console.log(listaNote);
            setNoteFiltrate(note.filter((inregistrare) => FilterOptions(inregistrare)));
        }
        if(anStudiuSelectat===''&&semestruSelectat==='')
            setNoteFiltrate(note);
    }, [anStudiuSelectat, semestruSelectat])

    const FilterOptions = (inregistrare) => {
        if (anStudiuSelectat !== '' &&  semestruSelectat === '')
            return inregistrare.anStudiu === anStudiuSelectat;

        if (anStudiuSelectat !== '' && semestruSelectat !== '')
            return (inregistrare.anStudiu === anStudiuSelectat && inregistrare.semestruPlan === semestruSelectat);

        if (anStudiuSelectat === '' && semestruSelectat !== '')
            return inregistrare.semestruPlan === semestruSelectat;
    }

    const onChangeAnStudiu = (e, {value}) => {
        setAnStudiu(value);
    }

    const onChangeSemestru = (e, {value}) => {
        setSemestru(value);
    }

    return (
        <div className={classes.root}>
            <Transition.Fade bottom cascade>
                <div className={classes.header}>
                    <h2>Consultare Note</h2>
                    <Divider/>
                </div>
                <Form className={classes.form}>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            label='An de studiu:'
                            clearable={true}
                            onC
                            fluid
                            upward
                            selection
                            options={aniStudiu}
                            placeholder='Alegeti anul de studiu'
                            required={false}
                            onChange={onChangeAnStudiu}
                        />
                        <Form.Dropdown
                            label='Semestru:'
                            clearable={true}
                            fluid
                            upward
                            selection
                            options={semestre}
                            required={false}
                            placeholder='Alegeti semestrul'
                            onChange={onChangeSemestru}
                        />
                    </Form.Group>
                </Form>
                <div className={classes.tabel} style={{height: ((Math.max(noteFiltrate.length + 1, 5)) * 52.8)}}>
                    <DataGrid
                        components={{
                            loadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={loading}
                        hideFooterPagination={true}
                        hideFooterSelectedRowCount={true}
                        hideFooterRowCount={true}
                        hideFooter={true}
                        rows={noteFiltrate}
                        columns={columns}
                        pageSize={noteFiltrate.length}
                    />
                </div>
            </Transition.Fade>
        </div>
    );
};

export default NoteContent;