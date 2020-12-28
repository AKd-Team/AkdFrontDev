import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import AlertDialog from "./AlertDialog";
import EditIcon from "@material-ui/icons/Edit";
import EditDialog from './EditDialog'
import {makeStyles} from "@material-ui/core/styles";
import CreateDialog from "./CreateDialog";

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
        const res = await axios.delete("http://localhost:4000/admin/deleteRegula/" + id, {
            headers: {
                'Authorization': `token ${User.token}`
            }
        });
        console.log(res.status);
        setOpen(false)

        /*if(res.status===200)
            alert('Regula a fost stearsa!')*/
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

        await axios.put("http://localhost:4000/admin/updateRegula",
            regula,
            {
                headers: {
                    'Authorization': `token ${User.token}`
                }
            }).catch((error) => {
            console.log(error.response)
        })
            .then(() =>
                // setRegulament([...regulament.filter(r => r.idRegulament !== regula.idRegulament), regula]),
                getReguli()
            )
    }

    const handleOpenCreateForm = () => {
        return {
            titlu: "",
            continut: "",
            idFacultate: ""
        }
    }

    useEffect(() => {

        getReguli();
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
                </div>
            )))}
        </div>
    );
};

export default EditareRegulament;