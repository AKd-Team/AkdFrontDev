import React from 'react';
import SegmentCriteriu from './SegmentCriteriu'

const ReviewDisciplina=({criterii})=>{

    return(
        <div>
            {criterii.map(((criteriu, index) => (
                <SegmentCriteriu id={criteriu.idCriteriu} criteriu={criteriu} key={index}/>
            )))}
        </div>
    );
};

export default ReviewDisciplina;