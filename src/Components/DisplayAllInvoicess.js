import React from "react";
import MainContainer from "./MainContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class DisplayAllInvoices extends React.Component{
    constructor(props){
        super(props);

        this.deleteInvoice = this.deleteInvoice.bind(this)   
    }

    deleteInvoice(){
        console.log('Quieres borrar una factura')
    }

    componentDidMount(){
        //se ejecuta de forma automatica
        fetch('/api/readinvoice/all',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response)=>{
                if(response.ok){
                    //todo ok
                    return response.json();
                }else{
                    //hubo problemas
                    throw new Error();
                }  
        }).then((responseAsJson)=>{
           console.log(responseAsJson); 
        }).catch(()=>{
            console.log('Hubo problemas');
        });
    }

    render(){
        const data = [
            {id: '5456346456',description : 'hdsavhgdaksdhk'},
            {id: '5456346456',description : 'hdsavhgdaksdhk'},
            {id: '5456346456',description : 'hdsavhgdaksdhk'}
        ];

        let markup = [];

        data.map((item,index)=>{
            markup.push(
                <Row key={'index-'+index}>
                    <Col>{item.id}</Col>
                    <Col>{item.description}</Col>
                    <Col>
                    <Button
                    variant="danger"
                    size="lg"
                    onClick={this.deleteInvoice}>
                            Delete
                    </Button>
                    </Col>
                </Row>
            );
        });
        return(
            <MainContainer
            head='Invoices Listing'>
                <Container style={{color:'white'}}>
                    <Row>
                        <Col><h5>Invoice Id</h5></Col>
                        <Col><h5>Description</h5></Col>
                        <Col><h5>Actions</h5></Col>
                    </Row>
                    {markup}
                </Container>
            </MainContainer>
            );
    }
}