import React, {useEffect, useState, useRef} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles"
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles((theme) => ({
    divColor: {
        backgroundColor: '#E7EDF8',
        paddingBottom: '2%',
        paddingTop: '2%',
        marginBottom: '2%',
        marginTop: '2%',
        marginLeft: '15%',
        marginRight: '15%',
        border: '2px solid #004276',
        borderRadius: 6
    },
    continut: {
        fontSize: 18,
        contentAlign: 'left',
        marginLeft: 10
    },
    titlu: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#004276',
        marginBottom: 15
    },
    icons: {

        textAlign: 'right',
        color: '#004276'
    }
}))

const EditareRegulament = props => {
    const history = useHistory();
    const User = JSON.parse(localStorage.getItem("user"));
    const [regulament, setRegulament] = useState([])

    const idSpecializare = User.idSpecializare;
    const styles = useStyles();



    const getReguli = async () => {
        await axios.get("http://localhost:4000/admin/listaReguli/" + idSpecializare, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        })
            .then((response) => {

                setRegulament(new Array(response.data.length).fill().map((value, index) => ({
                    idRegulament: response.data[index].idRegulament,
                    titlu: response.data[index].titlu,
                    continut: response.data[index].continut,
                    idFacultate: response.data[index].idFacultate
                })));

            })
            .catch(function (error) {

                console.log(error);
            });
    }

    async function deleteRegulaRequest(id) {
        const res = await axios.delete("http://localhost:4000/admin/deleteRegula/" + id, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        });
        console.log(res.status);

        /*if(res.status===200)
            alert('Regula a fost stearsa!')*/
        getReguli();

    }


    useEffect(() => {

        getReguli();

       /* setRegulament([
            {
                idRegulament: 1,
                titlu: "Reguli studenti",
                continut: "blablablabla",
                idFacultate: null
            },
            {
                idRegulament: 2,
                titlu: "Reguli profi",
                continut: "nu au voie sa pice studentii",
                idFacultate: null
            },
            {
                idRegulament: 3,
                titlu: "Reguli vacanta",
                continut: "vacanta e tot anul",
                idFacultate: null
            },
            {
                idRegulament: 4,
                titlu: "Reguli burse",
                continut: "toti studentii primesc bani de cafea",
                idFacultate: null
            },
            {
                idRegulament: 5,
                titlu: "Reguli supreme",
                continut: "party uri in fiecare vineri cu prezenta",
                idFacultate: null
            },

        ]);*/
    }, [])


    if (User != null) {
        if (User.tipUtilizator === "admin") {

        } else {
            history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
        }
    } else {
        history.push("/");
    }

    return (
        <div>
            {regulament.map(((item, index) => (
                <div key={index} className={styles.divColor}>
                    <div className={styles.titlu}> {item.titlu}

                        <AlertDialog onDelete={() => deleteRegulaRequest(item.idRegulament)} ></AlertDialog>

                    </div>
                    <div className={styles.continut}> {item.continut}</div>
                </div>
            )))}
        </div>
    );
};

export default EditareRegulament;