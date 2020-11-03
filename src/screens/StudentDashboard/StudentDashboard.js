import React, {useState} from 'react';

const StudentDashboard = (props) =>{

    const [Content,setContent] = useState('home');

    return <div>
        <h1>
        This is a student dashboard and the current page is {Content}
        </h1>
    </div>;
};

export default StudentDashboard;