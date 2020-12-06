import React,{Component}  from "react";
import CreareContMenu from "./CreareContMenu";
import { Menu } from 'semantic-ui-react'
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import Slide from 'react-reveal';
import {motion} from "framer-motion";
const NavBar = (props) =>{
    return(
        <Slide top>
        <Menu fluid widths={6} >
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.8 }}
                >
                <Link to="/admindash/admin">
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
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                <CreareContMenu />
                </motion.div>
            </Menu.Item>

            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/admindash/editare-catalog">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big edit icon"/>
                        <p>Editare catalog</p>
                    </Button>
                </Link>
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/admindash/editare-regulament">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big info circle icon"/>
                        <p>Editare regulament</p>
                    </Button>
                </Link>
                </motion.div>
            </Menu.Item>
            <Menu.Item>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                <Link to="/admindash/editare-calendar">
                    <Button
                        className="root"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <i className="big calendar alternate icon"></i>
                        Editare calendar
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