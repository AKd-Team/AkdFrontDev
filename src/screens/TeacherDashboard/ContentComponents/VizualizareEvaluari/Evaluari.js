import React, {useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import useDeepCompareEffect from "use-deep-compare-effect";
import * as Transition from "react-reveal";
import {Divider, Form} from "semantic-ui-react";
import {makeStyles} from "@material-ui/core/styles";
import TabelOptiuni from "./TabelOptiuni";

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
        marginBottom: 70,
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: "middle",
        zIndex: "auto"
    },
    header: {
        marginTop: 30,
        marginBottom: 40,
        textAlign: 'center'
    },

}));

const Evaluari = () => {
    const history = useHistory();
    const User = JSON.parse(localStorage.getItem("user"));
    const id = User.id;
    const [materii, setMaterii] = useState([]);
    const [materieSelectata, setMaterieSelectata] = useState('Materie');
    const styles = useStyles();
    const [listaCriterii, setListaCriterii] = useState([]);
    const [medii, setMedii] = useState([]);
    const [dateTabel, setDateTabel] = useState([]);
    const [optMaterii, setOptMaterii] = useState([{
        key: "Alegere materie",
        text: "Alegere materie",
        value: "Alegere materie",
    }]);

    if (User != null) {
        if (User.tipUtilizator === "profesor") {

        } else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizatore}`);
        }
    } else {
        history.push("/");
    }

    const getMaterii = async () => {
        await axios.get("http://localhost:4000/profesor/" + id + "/materii",
            {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            }).then((response) => {
            setMaterii(new Array(response.data.length).fill().map((value, index) => ({
                idMaterie: response.data[index].idMaterie,
                numeMaterie: response.data[index].nume,
            })));
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const getEvaluari = async (obj) => {
        await axios.get("http://localhost:4000/profesor/rezultateEvaluare/" + obj.idMaterie + "/" + id, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        }).then((response) => {
            setListaCriterii(response.data.criterii);
            setMedii(response.data.medii);

            console.log(response.data);
        })
            .catch(function (error) {

                console.log(error);
            });
    }

    const optiuniArray = () => {
        const array = [];
        materii.forEach((materie) => {
            array.push(
                {
                    key: materie.numeMaterie,
                    text: materie.numeMaterie,
                    value: materie.numeMaterie,
                })
        })
        return array;
    }

    const findMaterie = (str: string) => {
        const obj = materii.filter(materie => materie.numeMaterie === str);
        if (obj === undefined)
            return [];
        else return obj;
    }

    function dateTabelFunc() {
        const array = [];
        for (var index = 0; index < listaCriterii.length; index++) {
            array.push({
                id: index + 1,
                criteriu: listaCriterii[index],
                medie: medii[index]
            })
        }
        return array;
    }

    useDeepCompareEffect(() => {
        getMaterii().then(() => {
            setOptMaterii(optiuniArray());
            console.log(optMaterii);
        });

    }, [optMaterii])

    useDeepCompareEffect(() => {
        console.log(materieSelectata);
        const obj = findMaterie(materieSelectata);
        if (obj.length > 0) {
            getEvaluari(obj[0]);
        }
        if (listaCriterii.length > 0) {
            setDateTabel(dateTabelFunc());
            console.log(dateTabel);
        }
        if (materieSelectata === '') {
            setDateTabel([]);
        }
    }, [materieSelectata, dateTabel, listaCriterii, medii])


    const onChangeMaterie = (e, {value}) => {
        setMaterieSelectata(value);
    }

    return (
        <div className={styles.root}>
            <Transition.Fade bottom cascade>
                <div className={styles.header}>
                    <h2>Vizualizare Evaluari</h2>
                    <Divider/>
                </div>

                <Form className={styles.form}>

                    <Form.Dropdown
                        label='Discipline:'
                        clearable={true}
                        fluid
                        upward
                        selection
                        options={optMaterii}
                        placeholder='Alegeti disciplina'
                        required={false}
                        onChange={onChangeMaterie}
                    />

                </Form>
                <TabelOptiuni date={dateTabel}/>

            </Transition.Fade>
        </div>
    );
};

export default Evaluari;