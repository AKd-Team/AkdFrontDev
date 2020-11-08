import React,{useState,useEffect} from "react";
import { Menu } from 'semantic-ui-react'
import Button from "@material-ui/core/Button";
import Link from './Link';
import OrarMenu from "./OrarMenu";
import SaliMenu from "./SaliMenu";


const NavBar = (props) =>{
    return(
        <Menu fluid widths={8} >
            <Menu.Item>
                <Link href="/teacherdash/teacher">
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
                <Link href="/teacherdash/listaStudenti">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Lista Studenti
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <SaliMenu/>
            </Menu.Item>
            <Menu.Item>
                <Link href="/teacherdash/adaugareNote">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Adaugare Note
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/teacherdash/evaluari">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Evaluari
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/teacherdash/statistici">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Statistici
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/login">
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