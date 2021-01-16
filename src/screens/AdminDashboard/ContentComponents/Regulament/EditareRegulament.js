import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import AlertDialog from "./AlertDialog";
import EditIcon from "@material-ui/icons/Edit";
import EditDialog from './EditDialog'
import {makeStyles} from "@material-ui/core/styles";
import CreateDialog from "./CreateDialog";
import {Divider, Segment} from 'semantic-ui-react'


const useStyles = makeStyles(() => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        marginTop: 30,
        marginBottom: 40,
        textAlign: 'center'
    },

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
        color: '#004276',
        marginBottom: 5

    }
}))

const EditareRegulament = () => {
    const history = useHistory();
    const User = JSON.parse(localStorage.getItem("user"));
    const [regulament, setRegulament] = useState([])
    const [open, setOpen] = useState(false);
    const idSpecializare = User.idSpecializare;

    const styles = useStyles();
    const [regula, setRegula] = useState(
        {
            titlu: "",
            continut: "",
            idFacultate: undefined
        });


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
        await axios.delete("http://localhost:4000/admin/deleteRegula/" + id, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        });
        setOpen(false)
        getReguli();
    }

    const handleCreateRegula = async (regula) => {
        await axios.post("http://localhost:4000/admin/addRegula",
            regula, {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            }).then(() =>
            setRegulament([...regulament, regula])
        )
    }

    const handleEditRegula = async (regula) => {
        var axios = require('axios');
        var data = JSON.stringify({
            "IdRegula": regula.idRegulament,
            "Titlu": regula.titlu,
            "Continut": regula.continut,
            "IdFacultate": regula.idFacultate,
        });

        var config = {
            method: 'put',
            url: 'http://localhost:4000/admin/updateRegula',
            headers: {
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(data);
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                getReguli();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOpenCreateForm = () => {
        return {
            titlu: "",
            continut: "",
            idFacultate: ""
        }
    }

    useEffect(() => {
        if (User != null) {
            if (User.tipUtilizator === "admin") {

            } else {
                history.push(`/${User.tipUtilizator}dash/${User.tipUtilizator}`);
            }
        } else {
            history.push("/");
        }

        getReguli();
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <h2>Regulament</h2>
                <Divider/>
            </div>
            {regulament.map(((item, index) => (
                <Segment color='blue' raised style={{marginTop: '1%', marginLeft: '20%', marginRight: '20%'}}
                         key={index}>
                    <div className={styles.titlu}> {item.titlu}

                        <AlertDialog onDelete={() => deleteRegulaRequest(item.idRegulament)}
                                     onClose={() => setOpen(false)}/>
                        <div className={styles.icons}>
                            <EditIcon onClick={() => {
                                setRegula(item);
                                setOpen(true)
                            }}/>
                        </div>

                        <EditDialog
                            open={open}
                            setOpen={setOpen}
                            selectedItem={regula}
                            editRegula={handleEditRegula}/>

                        <CreateDialog
                            regulaInit={handleOpenCreateForm}
                            createRegula={handleCreateRegula}/>
                    </div>
                    <div className={styles.continut}> {item.continut}</div>
                </Segment>
            )))}
        </div>
    );
};

export default EditareRegulament;