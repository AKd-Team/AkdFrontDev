import React,{useState,useEffect,Component} from "react";
import OrarMenu from "./OrarMenu";
import ProfesoriMenu from "./ProfesoriMenu";
import { Menu } from 'semantic-ui-react'
import NoteMenu from "./NoteMenu";
import Button from "@material-ui/core/Button";
import {Link } from 'react-router-dom';
import Slide from 'react-reveal';
import {motion} from "framer-motion";
import {Frame} from "framer";

const NavBar = (props) =>{

    return(
        <Slide top>
        <Menu fluid widths={8} >
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                >
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
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
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
                </motion.div>
            </Menu.Item>
            <Menu.Item >
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <OrarMenu />
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                <ProfesoriMenu />
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                <NoteMenu/>
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
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
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
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
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
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
                </motion.div>
            </Menu.Item>
        </Menu>
        </Slide>
    );
};

export default NavBar;