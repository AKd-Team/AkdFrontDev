import React from "react";

class HomeContentC extends React.Component{
    constructor(props) {
        super(props);

        this.state= {crtUser:null}
    }


    render() {
        const User=JSON.parse(localStorage.getItem( "user"));
        return (
            <h1>This is home page for {User.username} </h1>
        );
    }
}

export default HomeContentC;