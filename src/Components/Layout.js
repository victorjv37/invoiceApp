import React from 'react';
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
    }

    componentDidMount(){
        //este metodo se ejecuta automaticamente
        fetch('/api/readinvoice'+this.props.invoiceId,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response)=>{
            console.log(response);
        });
    }

    closeAlert(){

        this.setState({
            show : false
        });

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

    render(){
        return(
        <div>
            <Form onSubmit={this.createInvoice}>
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
                        <CustomTextField
                        customId='seller-address'
                        label="Seller's address"
                        name='sellerAddress'
                        placeholder='Enter address...'
                        changeHandler={this.inputHandler}
                        aid='Enter the full address' />
                    </Col>
                    <Col>
                        <CustomTextField
                        customId='customer-name'
                        label="Customer's name"
                        name='customerName'
                        placeholder='Enter name...'
                        changeHandler={this.inputHandler}
                        aid='Enter the full name' />
                        <CustomTextField
                        customId='customer-address'
                        label="Customer's address"
                        name='customerAddress'
                        placeholder='Enter address...'
                        changeHandler={this.inputHandler}
                        aid='Enter the full address' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PricesAndDescriptions
                        itemsInfo={this.state.itemsInfo} />
                        <SubmitPriceAndDescription
                        descriptionVal={this.state.itemDescription}
                        handler={this.inputHandler}
                        priceVal={this.state.itemPrice}
                        buttonHandler={this.clickHandler} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h5>${this.state.finalPrice}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <CustomTextArea
                    label='Terms and Conditions'
                    name='termsAndConditions'
                    val={this.state.termsAndConditions}
                    changeHandler={this.inputHandler} />
                    </Col>
                </Row>
                <Row>
                    <Col>
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