import React from "react";

const Link = ({href,children}) =>{
    const onClick = () =>{

    }
    return(
        <a  onClick={onClick} href={href}>
            {children}
        </a>
    );
};

export default Link;