import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonToShowAllInvoices(props){

    const history = useHistory();
    
    function handleClick(){
        history.push('/showallinvoices')
    }
    
    return(
        <Button
            style={{marginTop:'2em'}}
            size='lg'
            variant='danger'
            onClick={handleClick}>
            Show all invoices
        </Button>
    );
}