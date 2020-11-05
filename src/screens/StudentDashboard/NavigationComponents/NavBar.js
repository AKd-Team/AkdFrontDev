import React,{useState,useEffect} from "react";
import OrarMenu from "./OrarMenu";
import ProfesoriMenu from "./ProfesoriMenu";
import { Menu } from 'semantic-ui-react'

const NavBar = () =>{


    return(
        <Menu fluid widths={8} >
            <Menu.Item >
                <a href="/">
                <i className="big home icon"/>
                </a>
            </Menu.Item>
            <Menu.Item>
                <a href="/datepersonale">
                    <i className="big address card icon"/>
                    Date Personale
                </a>
            </Menu.Item>
            <Menu.Item >
                <OrarMenu />
            </Menu.Item>
            <Menu.Item>
                <ProfesoriMenu />
            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
            <Menu.Item>

            </Menu.Item>
        </Menu>
    );
};

export default NavBar;