import React, {useEffect, useState} from "react";
import {DataGrid, GridOverlay} from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
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

    tabel: {
        width: '90%',
        maxWidth: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    }
}));

// const columns: Columns = [
//     {field: 'numeMaterie', headerName: 'Disciplina', width: 95, headerClassName: 'theme-header centerHeader'},
//     {field: 'anDeStudiu', headerName: 'An studiu', width: 120, headerClassName: 'theme-header'},
//     {field: 'anCalendaristic', headerName: 'An', width: 120, headerClassName: 'theme-header'}
// ];


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
    const timer = React.useRef();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'id', headerName: 'Nr.Crt.', width: 98, headerClassName: 'theme-header' },
        { field: 'criteriu', headerName: 'Criteriu', width: 700, headerClassName: 'theme-header' },
        { field: 'medie', headerName: 'Nota medie evaluari', width: 200, headerClassName: 'theme-header' },
    ];

    useEffect(() =>{
        timer.current = window.setTimeout(async () => {setLoading(false)}, 2100)
        },
        []
    )

    return(
        <div className={classes.root}>
        <div className={classes.tabel} style={{height: ((Math.max(props.date.length + 1, 7)) * 52.8)}}>
            <DataGrid
                components={{
                    loadingOverlay: CustomLoadingOverlay,
                }}
                loading={loading}
                hideFooterPagination={true}
                hideFooterSelectedRowCount={true}
                hideFooterRowCount={true}
                hideFooter={true}
                rows={props.date}
                columns={columns}
            />

            </div>
        </div>
    );
};

export default TabelOptiuni;