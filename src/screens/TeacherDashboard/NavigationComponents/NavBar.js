import React,{useState,useEffect} from "react";
import { Menu } from 'semantic-ui-react'
import Button from "@material-ui/core/Button";
import OrarMenu from "./OrarMenu";
import SaliMenu from "./SaliMenu";
import {Link} from 'react-router-dom';
import Slide from 'react-reveal';
import {motion} from "framer-motion";
const NavBar = (props) =>{
    return(
        <Slide top>
        <Menu fluid widths={8} >
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/profesordash/profesor">
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
                <Link to="/profesordash/listaStudenti">
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
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                <SaliMenu/>
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/profesordash/adaugareNote">
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
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/profesordash/evaluari">
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
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/profesordash/statistici">
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