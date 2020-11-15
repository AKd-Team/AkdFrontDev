import React,{useState,useEffect,Component} from "react";
import OrarMenu from "./OrarMenu";
import ProfesoriMenu from "./ProfesoriMenu";
import { Menu } from 'semantic-ui-react'
import NoteMenu from "./NoteMenu";
import Button from "@material-ui/core/Button";
import {Link } from 'react-router-dom';

const NavBar = (props) =>{
    return(
        <Menu fluid widths={8} >
            <Menu.Item>
                <Link to="/studentdash/student">
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
            <Menu.Item>
                <Link to="/studentdash/datepersonale">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                    <i className="big address card icon"/>
                    Date Personale
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item >
                <OrarMenu />
            </Menu.Item>
            <Menu.Item>
                <ProfesoriMenu />
            </Menu.Item>
            <Menu.Item>
                <NoteMenu/>
            </Menu.Item>
            <Menu.Item>
                <Link to="/studentdash/contract">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big file alternate icon"/>
                        Contracte
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/studentdash/regulament">
                <Button
                    className="root"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    color="primary"
                >
                    <i className="big info circle icon"/>
                    Regulament
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