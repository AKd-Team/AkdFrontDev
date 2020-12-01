import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const Footer = () => {
    const useStyles = makeStyles((theme) => ({
        footerStyle: {
            marginTop: 5,
            padding: 10,
            color: '#004276',
            position: "fixed",
            bottom: 0,
            left: 0,
            width: '100%',
            alignItems:'center'
        }
    }))
    const classes=useStyles();
    return (
        <div position="sticky" color='#004276'>
            <p>This is some content in sticky footer</p>
        </div>
    );
}

export default Footer;