import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import ButtonToCreateInvoice from './ButtonToCreateInvoice';
import ButtonToShowAllInvoices from "./ButtonToShowAllInvoices";

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Jumbotron>
                <h1>Welcome to Invoice Generator</h1>
                <p>Press any of the buttons below</p>
                <ButtonToCreateInvoice/>
                {"  "}
                <ButtonToShowAllInvoices/>
            </Jumbotron>
        );
    }
}