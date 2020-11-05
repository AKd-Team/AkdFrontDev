import React from "react";
import { Dropdown } from 'semantic-ui-react'
const ProfesoriMenu = () =>{
    return(
        <Dropdown item text='Profesori'>
            <Dropdown.Menu>
                <Dropdown.Item>Lista Profesori</Dropdown.Item>
                <Dropdown.Item>Evaluari</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfesoriMenu;