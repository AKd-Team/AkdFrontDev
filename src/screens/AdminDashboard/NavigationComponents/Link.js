import React from "react";

const Link = ({href,children}) =>{
    const onClick = (event) =>{
        event.preventDefault();
        window.history.pushState({},'',href);

        const NavEvent = new PopStateEvent('popstate');
        window.dispatchEvent(NavEvent);
    }
    return(
        <a  onClick={onClick} href={href}>
            {children}
        </a>
    );
};
export default Link;