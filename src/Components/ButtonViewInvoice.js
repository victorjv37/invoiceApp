import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ButtonViewInvoice(props){

    const history = useHistory();
    
    function handleClick(){
        history.push('/displayinvoice/'+ props.invoiceId);
    }
    
    return(
        <Button
            variant='warning'
            onClick={handleClick}>
            View Invoice
        </Button>
    );
}