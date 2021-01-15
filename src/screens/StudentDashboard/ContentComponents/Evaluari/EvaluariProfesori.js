import React, {useEffect, useState} from "react";
import axios from "axios";
import { Divider, Form} from "semantic-ui-react";
import {makeStyles} from "@material-ui/core/styles";
import * as Transition from "react-reveal";
import useDeepCompareEffect from 'use-deep-compare-effect'
import ReviewDisciplina from "./ReviewDisciplina";
import { toast } from 'react-toastify';

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
        marginTop: 70,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: "middle",
        zIndex: 10
    },
    header: {
        marginTop: 30,
        marginBottom: 40,
        textAlign: 'center'
    },
    sendBtn:{
        marginTop: 15,
        marginBottom: 25
    }

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
        key: "Optiune",
        text: "Optiune",
        value: "Optiune",
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
    const arrayNote = [];


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
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    function stergeRepetari(){

        for(var i=0; i<arrayNote.length; i++)
        {
            for(var j=i+1; j<arrayNote.length; j++)
            {
                if(arrayNote[i].idCrit ===arrayNote[j].idCrit){
                    arrayNote.splice(i, 1);
                }
            }
        }
    }

    function note() {
        if (criterii.length > 0 && arrayNote.length > 0) {
            const arrayN = [];
            const arrayCrit = [];
            stergeRepetari();
            arrayNote.sort(function (a, b) {
                return a.idCrit - b.idCrit
            });
            console.log(arrayNote);
            arrayNote.forEach((el) => {
                arrayN.push(parseInt(el.nota));
                arrayCrit.push(el.idCrit);
            })
            return {arrayN, arrayCrit};
        }
    }

    const trimiteNote = async (review) => {

        await axios.post("http://localhost:4000/student/adaugareReview",
            review,
            {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            }).then((response) => {
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
        setFormaInvatamant(obj);
        if(obj.length > 0) {
            if(obj[0].curs===true || formaSelect==="Curs"){
                getProfesori("Curs", obj[0].idMaterie)
                    .then(() => {
                        setProfesoriCurs(responseData);
                    })
            }

            if(formaSelect==="Laborator" && obj[0].laborator===true){
                getProfesori("Laborator", obj[0].idMaterie)
                    .then(() => {
                        setProfesoriLaborator(responseData);
                    })
            }
             if(formaSelect==="Seminar" && obj[0].seminar === true){
                 getProfesori("Seminar", obj[0].idMaterie)
                      .then(() => {
                                setProfesoriSeminar(responseData);
                            })
                    }
        }
        setProfiActuali(getProfiAfisare());
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
    useEffect(() => {
        if(disciplinaSelect === '' || profesorSelect === '' || formaSelect === '')
            setExistaEvaluarea(false);
    }, [disciplinaSelect, profesorSelect, formaSelect])

    useEffect( () => {
        const objProf = findProfesor(profesorSelect);
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
            getExistaEvaluarea(obj).then(() => {
                getCriterii();
            })
        }

    },[profesorSelect, existaEvaluarea, disciplinaSelect])



    function sendReview()
    {
        if(existaEvaluarea === true) return toast("Evaluarea acestei discipline a mai fost facuta!");
        const obj = note();
        if(obj === undefined && existaEvaluarea === false) return toast("Evaluarea nu a fost completata!");
        if(obj !== undefined && existaEvaluarea === false){
            const prof = findProfesor(profesorSelect);
            const materie = findDisciplina(disciplinaSelect);

            const review = {
                IdProfesor: prof[0].idProfesor,
                IdMaterie: materie[0].idMaterie,
                IdStudent: User.id,
                AnDeStudiu: materie[0].anDeStudiu,
                AnCalendaristic: materie[0].anCalendaristic,
                Criterii: obj.arrayCrit,
                Note: obj.arrayN
            }
            trimiteNote(review);

            return toast("Evaluarea a fost trimisa cu succes!");
        }

    }

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
                    {existaEvaluarea === true && <h2 className={styles.titlu}>Evaluarea a mai fost facuta!</h2>}
                    {formaSelect !== '' && profesorSelect !== '' && existaEvaluarea === false && <ReviewDisciplina criterii={criterii} arrayNote={arrayNote} sendReview={sendReview} />}
                </div>
            </Transition.Fade>
        </div>
    );
};

export default EvaluariProfesori;