import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomTextArea from './CustomTextArea';
import CustomTextField from './CustomTextField';


export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            invoiceDescription : '',
            sellerName : ''
        }
        this.inputHandler = this.inputHandler.bind(this);
    }

    inputHandler(event){
        if(event.target.name === 'invoice-description'){
            this.setState({
                invoiceDescription : event.target.value
            })
            
            console.log('Invoice description: '+ event.target.value);
        }

        if(event.target.name === 'sellerName'){
            this.setState({
                sellerName : event.target.value
            });

            console.log('Seller Name: '+ event.target.value);
        }

    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <CustomTextArea
                        name='invoice-description'
                        label='Invoice Description'
                        val={this.state.invoiceDescription}
                        changeHandler={this.inputHandler} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CustomTextField
                        customId='seller-name'
                        label="Seller's name"
                        name='sellerName'
                        placeholder='Enter name...'
                        changeHandler={this.inputHandler}
                        aid='Enter the full name' />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            );
    }
}