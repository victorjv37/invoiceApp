import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonToMainMenu(props){

    const history = useHistory();
    
    function handleClick(){
        history.push('/')
    }
    
    return(
        <Button
            size='lg'
            variant='warning'
            style={{marginTop:'2em'}}
            onClick={handleClick}>
            Main Menu
        </Button>
    );
}