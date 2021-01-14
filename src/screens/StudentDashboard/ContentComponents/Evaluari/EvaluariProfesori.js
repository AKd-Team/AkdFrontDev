import React, {useEffect, useState} from "react";
import axios from "axios";
import { Divider, Form} from "semantic-ui-react";
import {makeStyles} from "@material-ui/core/styles";
import * as Transition from "react-reveal";
import useDeepCompareEffect from 'use-deep-compare-effect'
import ReviewDisciplina from "./ReviewDisciplina";

const useStyles = makeStyles(() => ({
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
    titlu: {
        fontSize: 30,
        marginTop: 30,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: "middle",
        zIndex: 'auto'
    },
    header: {
        marginTop: 30,
        marginBottom: 40,
        textAlign: 'center'
    },

}));


const EvaluariProfesori = () => {
    const User = JSON.parse(localStorage.getItem("user"));
    const idStudent = User.id;
    const styles = useStyles();
    const [optiuni, setOptiuni] = useState([])
    const [responseData, setResponseData] = useState([])
    const [profesoriCurs, setProfesoriCurs] = useState([])
    const [profesoriLaborator, setProfesoriLaborator] = useState([])
    const [profesoriSeminar, setProfesoriSeminar] = useState([])
    const [forma, setForma] = useState([{
        key: "Curs",
        text: "Curs",
        value: "Curs",
    }]);
    const [profiActuali, setProfiActuali] = useState([]);
    const [formaSelect, setFormaSelect] = useState('');
    const [discipline, setDiscipline] = useState([]);
    const [disciplinaSelect, setDisciplinaSelect] = useState({
        anCalendaristic: '',
        anDeStudiu: 0,
        curs: false,
        idMaterie: 0,
        laborator: false,
        numeMaterie: '',
        seminar: false
    });
    const [criterii, setCriterii] = useState([]);
    const [existaEvaluarea, setExistaEvaluarea] = useState(true);
    const [profesorSelect, setProfesorSelect] = useState({
        idProfesor:-1,
        numeProfesor:''
    });
    const [profiForm, setProfiForm] = useState([{
        key: "Alegere profesor",
        text: "Alegere profesor",
        value: "Alegere profesor",
    }]);

    const getOptiuni = async () => {
        await axios.get("http://localhost:4000/student/optiuniReview/" + idStudent, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        }).then((response) => {
            setOptiuni(new Array(response.data.length).fill().map((value, index) => ({
                idMaterie: response.data[index].idMaterie,
                numeMaterie: response.data[index].numeMaterie,
                anDeStudiu: response.data[index].anDeStudiu,
                anCalendaristic: response.data[index].anCalendaristic,
                curs: response.data[index].curs,
                seminar: response.data[index].seminar,
                laborator: response.data[index].laborator
            })));
            console.log(response.data);
        })
            .catch(function (error) {

                console.log(error);
            });
    }

    const getProfesori = async (str: string, id: number) => {

        await axios.get("http://localhost:4000/student/profesori/" + id + "/" + str, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        }).then((response) => {
            setResponseData(new Array(response.data.length).fill().map((value, index) => ({
                idProfesor: response.data[index].idProfesor,
                numeProfesor: response.data[index].numeProfesor
            })));
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getCriterii = async () => {
        await axios.get("http://localhost:4000/student/criterii", {
            headers: {
                'Authorization': `token ${User.token}`
            }
        }).then((response) => {
            setCriterii(new Array(response.data.length).fill().map((value, index) => ({
                idCriteriu: response.data[index].idCriteriu,
                descriere: response.data[index].descriere
            })));
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getExistaEvaluarea =  async (obj) => {

        await axios.post("http://localhost:4000/student/existentaEvaluare",
            obj,
            {
            headers: {
                'Authorization': `token ${User.token}`
            }
        }).then((response) => {
            setExistaEvaluarea(response.data);
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const optiuniArray = () => {
        const array = [];
        optiuni.forEach((optiune) => {
            array.push(
                {
                    key: optiune.numeMaterie,
                    text: optiune.numeMaterie,
                    value: optiune.numeMaterie,
                })
        })
        return array;
    }

    const findDisciplina = (str: string) => {
        const obj = optiuni.filter(optiune => optiune.numeMaterie === str);
        if (obj === undefined)
            return [];
        else return obj;
    }

    const findProfesor = (str: string) => {
        const obj = profiActuali.filter(prof => prof.numeProfesor === str);
        if (obj === undefined)
            return [];
        else return obj;
    }

    function setFormaInvatamant(obj) {
        const arrayForma = [];
        if (obj.length > 0) {
            if (obj[0].curs === true) {
                arrayForma.push({
                    key: "Curs",
                    text: "Curs",
                    value: "Curs",
                });
            }
            if (obj[0].laborator === true) {
                arrayForma.push({
                    key: "Laborator",
                    text: "Laborator",
                    value: "Laborator",
                });
            }
            if (obj[0].seminar === true) {
                arrayForma.push({
                    key: "Seminar",
                    text: "Seminar",
                    value: "Seminar",
                });
            }
            setForma(arrayForma);
        }}


    const getProfiAfisare = () => {
        if(disciplinaSelect){
            if(formaSelect === "Curs")
            {
                return profesoriCurs;
            }

            if(formaSelect === "Laborator")
            {
                return profesoriLaborator;
            }

            if(formaSelect === "Seminar"){
                return profesoriSeminar;
            }

        }
        return [];
    }

    useDeepCompareEffect(() => {
        getOptiuni().then(() => {
            const array = optiuniArray();
            setDiscipline(array);
        });
    }, [discipline, optiuni])


    useDeepCompareEffect(() => {
        const obj = findDisciplina(disciplinaSelect);
        console.log(obj);
        setFormaInvatamant(obj);
        if(obj.length > 0) {
            if(obj[0].curs===true || formaSelect==="Curs"){
                getProfesori("Curs", obj[0].idMaterie)
                    .then(() => {
                        console.log(responseData);
                        setProfesoriCurs(responseData);
                    })
            }

            if(formaSelect==="Laborator" && obj[0].laborator===true){
                getProfesori("Laborator", obj[0].idMaterie)
                    .then(() => {
                        console.log(responseData);
                        setProfesoriLaborator(responseData);
                    })
            }
             if(formaSelect==="Seminar" && obj[0].seminar === true){
                 getProfesori("Seminar", obj[0].idMaterie)
                      .then(() => {
                                console.log(responseData);
                                setProfesoriSeminar(responseData);
                            })
                    }
        }
        setProfiActuali(getProfiAfisare());
        console.log(getProfiAfisare())
        console.log(profiActuali);
    }, [discipline, disciplinaSelect, profesoriCurs, profesoriLaborator, formaSelect])

    useEffect(() => {

        const array = [];
        if(profiActuali !== [])
        {
            profiActuali.forEach((prof) => {
                array.push(
                    {
                        key: prof.numeProfesor,
                        text: prof.numeProfesor,
                        value: prof.numeProfesor,
                    })
            })
            setProfiForm(array);
            console.log(profiForm);
        }
    }, [profiActuali, setProfiForm])


    const onChangeDisciplina = (e, {value}) => {
        setDisciplinaSelect(value);
    }

    const onChangeForma = (e, {value}) => {
        setFormaSelect(value);
    }

    const onChangeProfesor = (e, {value}) => {
        setProfesorSelect(value);
    }

    useEffect( () => {
        const objProf = findProfesor(profesorSelect);
        console.log(profesorSelect)
        console.log(objProf)
        const objDisciplina = findDisciplina(disciplinaSelect);
        if(objProf.length > 0 && objDisciplina.length > 0 )
        {
            const obj = {
                idProfesor: objProf[0].idProfesor,
                idMaterie: objDisciplina[0].idMaterie,
                idStudent: User.id,
                AnDeStudiu: objDisciplina[0].anDeStudiu,
                AnCalendaristic: objDisciplina[0].anCalendaristic
            }
            console.log(profesorSelect)
            console.log("obj")
            console.log(obj);

            getExistaEvaluarea(obj).then(() => {
                console.log(existaEvaluarea);
                getCriterii().then(() => {
                    console.log(criterii);
                })
            })
        }
    },[profesorSelect, existaEvaluarea, disciplinaSelect])


    return (
        <div className={styles.root}>
            <Transition.Fade bottom cascade>
                <div className={styles.header}>
                    <h2>Evaluari Profesor</h2>
                    <Divider/>
                </div>

                <Form className={styles.form}>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            style={{width: '100%', zIndex: 6}}
                            label='Discipline:'
                            clearable={true}
                            fluid
                            selection
                            options={discipline}
                            placeholder='Alegeti disciplina'
                            required={false}
                            onChange={onChangeDisciplina}
                        />
                        <Form.Dropdown
                            style={{width: '100%', zIndex: 6}}
                            label='Forma:'
                            clearable={true}
                            fluid
                            selection
                            options={forma}
                            placeholder='Alegeti forma'
                            required={false}
                            onChange={onChangeForma}
                        />
                        <Form.Dropdown
                            style={{width: '100%', zIndex: 6}}
                            label='Profesor:'
                            clearable={true}
                            fluid
                            selection
                            options={profiForm}
                            placeholder='Alegeti profesorul'
                            required={false}
                            onChange={onChangeProfesor}
                        />
                    </Form.Group>
                </Form>
                <div>
                    {profesorSelect !== '' && <ReviewDisciplina criterii={criterii}/> }
                </div>

            </Transition.Fade>
        </div>
    );
};

export default EvaluariProfesori;