import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CustomTextArea from './CustomTextArea';
import CustomTextField from './CustomTextField';
import PricesAndDescriptions from './PricesAndDescriptions';
import SubmitPriceAndDescription from './SubmitPriceAndDescription';
import CustomAlert from './CustomAlert';
import CustomCard from './CustomCard';
import ButtonToMainMenu from './ButtonToMainMenu';



export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            invoiceDescription : '',
            sellerName : '',
            sellerAddress : '',
            customerName : '',
            customerAddress : '',
            itemsInfo : [],
            itemDescription : '',
            itemPrice : '',
            termsAndConditions : '',
            finalPrice : 0,
            show : false,
            title : '',
            content : ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.createInvoice = this.createInvoice.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.updateInvoice = this.updateInvoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(!this.props.updateMode || !this.props.invoiceId){
            return;
        }

        //este metodo se ejecuta automaticamente
        fetch('/api/readinvoice/'+this.props.invoiceId,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response)=>{
            if(response.ok){

                return response.json();
            }else{
                throw new Error('Hubo problemas con el servidor');
            }
        }).then((responseAsJson)=>{
            //si todo sale bien
            this.setState({
                invoiceDescription : responseAsJson.invoiceDescription,
                sellerName : responseAsJson.sellerName,
                sellerAddress : responseAsJson.sellerAddress,
                customerName : responseAsJson.customerName,
                customerAddress : responseAsJson.customerAddress,
                itemsInfo : responseAsJson.items,
                finalPrice : responseAsJson.finalPrice,
                termsAndConditions : responseAsJson.terms
            });
            console.log(responseAsJson);
        }).catch((error)=>{
            console.log(error)
        });
    }

    closeAlert(){

        this.setState({
            show : false
        });

    }

    updateInvoice(event){

        const data = {
            sellerName : this.state.sellerName,
            sellerAddress : this.state.sellerAddress,
            customerName : this.state.customerName,
            customerAddress : this.state.customerAddress,
            items : this.state.itemsInfo,
            finalPrice : this.state.finalPrice,
            terms : this.state.termsAndConditions,
            invoiceDescription : this.state.invoiceDescription
        }

        fetch('/api/updateInvoice/'+this.props.invoiceId,{
            method : 'PATCH',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response )=>{
            if(response.ok){
                //todo se actualizo bien
                this.setState({
                    show : true,
                    title : 'The invoice was updated succesfully',
                    content: 'The invoice was saved on the system'
                });

            }else{
                //hubo un fallo
                this.setState({
                    show : true,
                    title : 'Problems when updating',
                    content: 'The invoice couldnt be updated'
                });
            }
        });

        event.preventDefault();
    }

    createInvoice(event){

        const data = {
            sellerName : this.state.sellerName,
            sellerAddress : this.state.sellerAddress,
            customerName : this.state.customerName,
            customerAddress : this.state.customerAddress,
            items : this.state.itemsInfo,
            finalPrice : this.state.finalPrice,
            terms : this.state.termsAndConditions,
            invoiceDescription : this.state.invoiceDescription
        }

        fetch('/api/createinvoice',{
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response )=>{
            if(response.ok){
                //todo fue exitoso
                this.setState({
                    show : true,
                    title : 'The invoice was created succesfully',
                    content: 'The invoice was saved on the system'
                });
            }else{
                //hubo un fallo
                this.setState({
                    show : true,
                    title : 'Oops!! The invoice was not created',
                    content: 'Try again...'
                });
            }
        });
        event.preventDefault();
    }

    clickHandler(){
            this.setState((state,props)=>{
                const currentItems = state.itemsInfo;

                let totalPrice = 0;
                state.itemsInfo.map((item, index )=>{
                    let price = parseFloat(item.price);
                    totalPrice = totalPrice + price;
                });

                totalPrice = totalPrice + parseFloat(state.itemPrice);

                return{
                    itemsInfo : currentItems.concat([
                            {
                                description : state.itemDescription,
                                price : state.itemPrice,
                            }
                    ]),
                    finalPrice : totalPrice
                }
            });
    }

    inputHandler(event){
        if(event.target.name === 'invoice-description'){
            this.setState({
                invoiceDescription : event.target.value
            });
            
            console.log('Invoice description: '+ event.target.value);
        }

        if(event.target.name === 'sellerName'){
            this.setState({
                sellerName : event.target.value
            });

            console.log('Seller Name: '+ event.target.value);
        }

        if(event.target.name === 'sellerAddress'){
            this.setState({
                sellerAddress : event.target.value
            });

            console.log('Seller Address: '+ event.target.value);
        }

        if(event.target.name === 'customerName'){
            this.setState({
                customerName : event.target.value
            });

            console.log('Customer Name: '+ event.target.value);
        }

        if(event.target.name === 'customerAddress'){
            this.setState({
                customerAddress : event.target.value
            });

            console.log('Customer Address: '+ event.target.value);
        }

        if(event.target.name === 'itemDescription'){
            this.setState({
                itemDescription : event.target.value
            });

            console.log('Item Description: '+ event.target.value);
        }

        if(event.target.name === 'itemPrice'){
            this.setState({
                itemPrice : event.target.value
            });

            console.log('Item Price: '+ event.target.value);
        }

        if(event.target.name === 'termsAndConditions'){
            this.setState({
                termsAndConditions : event.target.value
            });

            console.log('Terms and Conditions '+ event.target.value);
        }

    }

    handleSubmit(event){
        if(this.props.updateMode){
            //se quiere actualizar factura
            this.updateInvoice(event);
        }
        if(!this.props.updateMode)
            //se quiere crear una factura
            this.createInvoice(event);
    }

    render(){
        return(
        <div>
            <Form onSubmit={this.handleSubmit}>
            <Container>
                <Row style={{marginTop:'2em'}}>
                    <Col>
                    <CustomCard head='Invoice Description'>
                        <CustomTextArea
                        name='invoice-description'
                        label='Invoice Description'
                        val={this.state.invoiceDescription}
                        changeHandler={this.inputHandler} />
                    </CustomCard>
                    </Col>
                </Row>
                <Row style={{marginTop:'2em'}}>
                    <Col>
                    <CustomCard head='SELLERS INFORMATION'>
                        <CustomTextField
                            customId='seller-name'
                            label="Seller's name"
                            val={this.state.sellerName}
                            name='sellerName'
                            placeholder='Enter name...'
                            changeHandler={this.inputHandler}
                            aid='Enter the full name' />
                            <CustomTextField
                            customId='seller-address'
                            label="Seller's address"
                            val={this.state.sellerAddress}
                            name='sellerAddress'
                            placeholder='Enter address...'
                            changeHandler={this.inputHandler}
                            aid='Enter the full address' />
                    </CustomCard>
                    </Col>
                    <Col>
                    <CustomCard head='CUSTOMERS INFORMATION'>
                        <CustomTextField
                            customId='customer-name'
                            label="Customer's name"
                            val={this.state.customerName}
                            name='customerName'
                            placeholder='Enter name...'
                            changeHandler={this.inputHandler}
                            aid='Enter the full name' />
                            <CustomTextField
                            customId='customer-address'
                            label="Customer's address"
                            val={this.state.customerAddress}
                            name='customerAddress'
                            placeholder='Enter address...'
                            changeHandler={this.inputHandler}
                            aid='Enter the full address' />
                    </CustomCard>
                    </Col>
                </Row>
                <Row style={{marginTop:'2em'}}>
                    <Col>
                       <CustomCard head='ITEMS PURCHASED'>
                        <PricesAndDescriptions
                            itemsInfo={this.state.itemsInfo} />
                            <SubmitPriceAndDescription
                            descriptionVal={this.state.itemDescription}
                            handler={this.inputHandler}
                            priceVal={this.state.itemPrice}
                            buttonHandler={this.clickHandler} />
                        </CustomCard>
                    </Col>
                </Row>
                <Row style={{marginTop:'2em'}}>
                    <Col>
                    <CustomCard head='TOTAL PRICE'>
                        <h5>${this.state.finalPrice}</h5>
                    </CustomCard>
                    </Col>
                </Row>
                <Row style={{marginTop:'2em'}}>
                    <Col>
                    <CustomCard head='TERMS AND CONDITIONS'>
                        <CustomTextArea
                            label='Terms and Conditions'
                            name='termsAndConditions'
                            val={this.state.termsAndConditions}
                            changeHandler={this.inputHandler} />
                    </CustomCard>
                    </Col>
                </Row>
                <Row style={{marginTop:'2em'}}>
                <Col>
                    <Card>
                        <Card.Body>
                            {
                                (this.props.updateMode)?
                                <Button
                                    type='submit'
                                    style={{marginTop:'2em'}}
                                    variant='warning'
                                    size='lg'>
                                        Update Invoice
                                </Button>:
                                <Button
                                    type='submit'
                                    style={{marginTop:'2em'}}
                                    variant='primary'
                                    size='lg'>
                                        Create Invoice
                                </Button>
                            }
                            <ButtonToMainMenu/>    
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
            </Form>
            <CustomAlert
            show={this.state.show} 
            title={this.state.title} 
            content={this.state.content}
            close={this.closeAlert} />
        </div>
            );
    }
}