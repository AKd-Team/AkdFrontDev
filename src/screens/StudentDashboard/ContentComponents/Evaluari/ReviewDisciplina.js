import React from 'react';
import SegmentCriteriu from './SegmentCriteriu'
import {Button} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {Segment} from "semantic-ui-react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewDisciplina=({criterii, arrayNote, sendReview})=>{

    return(
        <Segment style={{marginTop:50}}>
            {criterii.map(((criteriu, index) => (
                <SegmentCriteriu idCriteriu={criteriu.idCriteriu} criteriu={criteriu} key={index} arrayNote={arrayNote}/>
            )))}
            <div style={{marginLeft:'73%'}}>
                <Button variant={"contained"} color={"primary"}  onClick={ () => sendReview()}>Trimite<SendIcon /></Button>
                <ToastContainer/>
            </div>

        </Segment>
    );
};

export default ReviewDisciplina;