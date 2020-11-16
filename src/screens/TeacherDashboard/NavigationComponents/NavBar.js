import React,{useState,useEffect} from "react";
import { Menu } from 'semantic-ui-react'
import Button from "@material-ui/core/Button";
import OrarMenu from "./OrarMenu";
import SaliMenu from "./SaliMenu";
import {Link} from 'react-router-dom';

const NavBar = (props) =>{
    return(
        <Menu fluid widths={8} >
            <Menu.Item>
                <Link to="/teacherdash/teacher">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big home icon"/>
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item >
                <OrarMenu />
            </Menu.Item>
            <Menu.Item>
                <Link to="/teacherdash/listaStudenti">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big list ul icon"></i>
                        Lista Studenti
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <SaliMenu/>
            </Menu.Item>
            <Menu.Item>
                <Link to="/teacherdash/adaugareNote">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big pencil alternate icon"></i>
                        Adaugare Note
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/teacherdash/evaluari">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big file alternate icon"></i>
                        Evaluari
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/teacherdash/statistici">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big chart line icon"></i>
                        Statistici
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                        variant="contained"
                        onClick={props.onLogout}
                    >
                        Log out
                    </Button>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default NavBar;