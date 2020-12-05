import React, {useState} from "react";
import {DataGrid, getCellElementFromIndexes, GridOverlay} from '@material-ui/data-grid';
import {useHistory} from "react-router"
import {Button, Divider, Form} from "semantic-ui-react";
import * as Transition from "react-reveal";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const grad = [
    {key:1,text:'Lector universitar/şef de lucrări',value: 'Lector univeristar'},
    {key:2,text:'Conferenţiar universitar',value: 'Conferentiar universitar'},
    {key:3,text:'Profesor universitar',value: 'Profesor univeristar'},
]
const departamentele=[
    {key:1,text:'--None--',value: 'None'},
    {key:2,text:'Matematica',value: 'Matematica'},
    {key:3,text:'Informatica',value: 'Informatica'}
]
const facultatile=[
    {key:1,text:'Facultatea de Matematica si Informatica',value: 'Cadre didactice titulare'},
    {key:2,text:'Facultatea de Educatie Fizica si Sport',value: 'Facultatea de Educatie Fizica si Sport'},
    {key:3,text:'Facultatea de Geografie',value: 'Facultatea de Geografie'}
]
const tipuriPersonalDidactic=[
    {key:1,text:'--None--',value: '--None--'},
    {key:2,text:'Cadre didactice titulare',value: 'Facultatea de Matematica si Informatica'},
    {key:3,text:'Profesori universitari emeriţi',value: 'Profesori universitari emeriţi'},
    {key:4,text:'Profesori invitaţi',value: 'Profesori invitaţie'},
    {key:5,text:'Cadre didactice asociate',value: 'Cadre didactice asociate'},
    {key:6,text:'Doctoranzi',value: 'Doctoranzi'},
    {key:7,text:'Personal didactic auxiliar',value: 'Personal didactic auxiliar'}
]

const columns: Columns = [
    { field: 'nume', headerName: 'Nume', width: 170, headerClassName: 'theme-header' },
    { field: 'prenume', headerName: 'Prenume', width: 180, headerClassName: 'theme-header' },
    { field: 'grad', headerName: 'Grad', width: 230,headerClassName: 'theme-header' },
    { field: 'departament', headerName: 'Departament', width: 130 , headerClassName: 'theme-header'},
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
    {
        field: 'materii',
        headerName: 'Materii Predate',
        sortable: false,
        width:300,
        headerClassName: 'theme-header'
        /*valueGetter: (params) =>
            params.map(
                }
            )
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,*/
    }
];

const rows = [
    { id: 1,nume: 'Pop', prenume: 'Ionela Denisa Valentina', grad:'Lector universitar/şef de lucrări',departament:'Matematica', mail:  'anca.andreica[at]cs.ubbcluj.ro', site: 'http://www.cs.ubbcluj.ro/~anca/'},
    { id: 2,nume: 'Marian Mihailescu', prenume: 'Ramona',grad:'Lector universitar/şef de lucrări', departament:'Informatica',mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 3,nume: 'Bob', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 4,nume: 'Muresan', prenume: 'Anamaria',grad:'Lector universitar/şef de lucrări', departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 5,nume: 'Ababei', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 6,nume: 'Pop', prenume: 'Ionela Denisa Valentina', grad:'Lector universitar/şef de lucrări',departament:'Matematica', mail:  'anca.andreica[at]cs.ubbcluj.ro', site: 'http://www.cs.ubbcluj.ro/~anca/' },
    { id: 7,nume: 'Marian Mihailescu', prenume: 'Ramona',grad:'Lector universitar/şef de lucrări', departament:'Informatica',mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 8,nume: 'Bob', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 9,nume: 'Muresan', prenume: 'Anamaria',grad:'Lector universitar/şef de lucrări', departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 10,nume: 'Ababei', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },  { id: 1,nume: 'Pop', prenume: 'Ionela Denisa Valentina', grad:'Lector universitar/şef de lucrări',departament:'Matematica', mail:  'anca.andreica[at]cs.ubbcluj.ro', site: 'http://www.cs.ubbcluj.ro/~anca/' },
    { id: 11,nume: 'Marian Mihailescu', prenume: 'Ramona',grad:'Lector universitar/şef de lucrări', departament:'Informatica',mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 12,nume: 'Bob', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 13,nume: 'Muresan', prenume: 'Anamaria',grad:'Lector universitar/şef de lucrări', departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 14,nume: 'Ababei', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },  { id: 1,nume: 'Pop', prenume: 'Ionela Denisa Valentina', grad:'Lector universitar/şef de lucrări',departament:'Matematica', mail:  'anca.andreica[at]cs.ubbcluj.ro', site: 'http://www.cs.ubbcluj.ro/~anca/' },
    { id: 15,nume: 'Marian Mihailescu', prenume: 'Ramona',grad:'Lector universitar/şef de lucrări', departament:'Informatica',mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 16,nume: 'Bob', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 17,nume: 'Muresan', prenume: 'Anamaria',grad:'Lector universitar/şef de lucrări', departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 18,nume: 'Ababei', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 19,nume: 'Bob', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 20,nume: 'Muresan', prenume: 'Anamaria',grad:'Lector universitar/şef de lucrări', departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' },
    { id: 21,nume: 'Ababei', prenume: 'Ionela Denisa',grad:'Lector universitar/şef de lucrări',departament:'Informatica', mail: 'ionelapop99@gmail.com', site: 'smartDeveloper.ro' }
];

const useStyles = makeStyles((theme) => ({
    root:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
        '& .theme-header': {
            backgroundColor: '#3f51b5',
            color: 'white',
            fontSize: 14,
        }
    },
    form:{
        marginTop: 40,
        marginLeft: 30,
        marginRight:30,
        marginBottom:30,
        justifyContent:'center',
        alignItems: 'center',
        verticalAlign: "middle"
    },
    bttnGroup:{
        marginLeft: 'auto',
        marginRight:'auto',
        justifyContent:'center',
        alignItems: 'center',
        height: 40,
        marginTop: 20
    },
    header:{
        marginTop:30,
        marginBottom:40,
        textAlign:'center'
    },
    tabel:{
        minHeight: ((rows.length-1)*52.5),
        width: '90%',
        maxWidth: 1502,
        marginLeft:'auto',
        marginRight:'auto'
    }
}));

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}


const ListaProfesoriContent = ( ) =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const [departament,setDepartament]=useState('');
    const [facultate,setFacultate]=useState('');

    const [departamente,setDepartamente]=useState([]);
    const [facultati,setFacultati]=useState([]);
    const [tipPersonalDidactic,setTipPersonalDidactic]=useState([]);

    const classes = useStyles();
    if(User!=null){
        if(User.Type==="student"){

        }
        else {
            history.push(`/${User.Type}dash/${User.Type}`);
        }
    }
    else{
        history.push("/");
    }

    const onChangeFacultate = (e,{value})=>{
        setFacultate(value)
    }

    const onChangeDepartament = (e,{value})=>{
        setDepartament(value)
    }

    const onChangePersonalDidactic = (e,{value})=>{
        setTipPersonalDidactic(value)
    }

    return (
        <div className={classes.root}>
            <Transition.Fade bottom cascade>
                <div className={classes.header}>
                    <h2>Lista personal didactic</h2>
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
                        options={facultatile}
                        onChange={onChangeFacultate}
                        placeholder='Alegeti facultatea'
                            required={true}
                        />
                        <Form.Dropdown
                            label='Departament'
                            clearable
                            fluid
                            upward
                            selection
                            options={departamentele}
                            onChange={onChangeDepartament}
                            placeholder='Alegeti departamentul'
                            required={false}
                        />
                        <Form.Dropdown
                            label='Tip personal didactic'
                            clearable
                            fluid
                            upward
                            selection
                            options={tipuriPersonalDidactic}
                            onChange={onChangePersonalDidactic}
                            placeholder='Alegeti departamentul'
                            required={false}
                        />
                        <Button className={classes.bttnGroup}/*onClick={handleSubmit}*/>Filter</Button>
                    </Form.Group>

                </Form>
                <div className={classes.tabel}>
                    <DataGrid
                        /*animatie la loading dar trebuie oprita
                        components={{
                            loadingOverlay: CustomLoadingOverlay,
                        }}
                        loading*/
                        hideFooterPagination={true}
                        hideFooterSelectedRowCount={true}
                        hideFooterRowCount={true}
                        hideFooter={true}
                        rows={rows}
                        columns={columns}
                        pageSize={rows.length-2}
                    />
                </div>
            </Transition.Fade>
        </div>
    );
};

export default ListaProfesoriContent;

