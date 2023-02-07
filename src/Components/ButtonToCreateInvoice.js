import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonToCreateInvoice(props){

    const history = useHistory();
    
    function handleClick(){
        history.push('/createinvoice')
    }
    
    return(
        <Button
            size='lg'
            variant='primary'
            onClick={handleClick}>
            Create Invoice    
        </Button>
    );
}