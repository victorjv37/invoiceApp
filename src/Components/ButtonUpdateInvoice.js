import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonUpdateInvoice(props){

    const history = useHistory();
    
    function handleClick(){
        history.push('/updateinvoice/'+ props.invoiceId);
    }
    
    return(
        <Button
            variant='primary'
            onClick={handleClick}>
            Update Invoice
        </Button>
    );
}