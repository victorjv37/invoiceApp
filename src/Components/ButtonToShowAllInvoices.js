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
            size='lg'
            variant='danger'
            onClick={handleClick}>
            Show all invoices
        </Button>
    );
}