import React,{useState,useEffect} from "react";
import CreareContMenu from "./CreareContMenu";
import Link from "./Link";
import { Menu } from 'semantic-ui-react'
import Button from "@material-ui/core/Button";

const NavBar = (props) =>{
    return(
        <Menu fluid widths={6} >
            <Menu.Item>
                <Link href="/admindash/admin">
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
                <CreareContMenu />
            </Menu.Item>

            <Menu.Item>
                <Link href="/admindash/editare-catalog">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Editare catalog
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/admindash/editare-regulament">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Editare regulament
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/admindash/editare-calendar">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        Editare calendar
                    </Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/">
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