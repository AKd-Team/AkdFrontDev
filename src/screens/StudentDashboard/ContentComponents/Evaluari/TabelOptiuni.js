import React, {useState} from "react";
import {useHistory} from "react-router";
import {DataGrid, GridOverlay} from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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

// const columns: Columns = [
//     {field: 'numeMaterie', headerName: 'Disciplina', width: 95, headerClassName: 'theme-header centerHeader'},
//     {field: 'anDeStudiu', headerName: 'An studiu', width: 120, headerClassName: 'theme-header'},
//     {field: 'anCalendaristic', headerName: 'An', width: 120, headerClassName: 'theme-header'}
// ];

const columns = [
    { field: 'idMaterie', headerName: 'ID', width: 70 },
    { field: 'numeMaterie', headerName: 'Disciplina', width: 130 },
    { field: 'anDeStudiu', headerName: 'An de studiu', width: 130 },
    { field: 'anCalendaristic', headerName: 'An calendaristic', width: 130 }
];
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{position: 'absolute', top: 0, width: '100%'}}>
                <LinearProgress/>
            </div>
        </GridOverlay>
    );
}

const TabelOptiuni = props =>{
    const history=useHistory();
    const User=JSON.parse(localStorage.getItem("user"));
    const classes = useStyles();
    const [loading, setLoading] = useState(true);


    return(
        <div className={classes.tabel} style={{height: ((Math.max(props.optiuni.length + 1, 7)) * 52.8)}}>
            <DataGrid
                components={{
                    loadingOverlay: CustomLoadingOverlay,
                }}
               // loading={loading}
                hideFooterPagination={true}
                hideFooterSelectedRowCount={true}
                hideFooterRowCount={true}
                hideFooter={true}
                rows={rows}
                columns={columns}
            />
        </div>
    );
};

export default TabelOptiuni;