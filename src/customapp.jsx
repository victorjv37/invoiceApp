import React from 'react';
import  ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContainer from './Components/MainContainer';
import CustomTextField from './Components/CustomTextField';
import CustomTextArea from './Components/CustomTextArea';
import PricesAndDescriptions from './Components/PricesAndDescriptions';
import SubmitPriceAndDescription from './Components/SubmitPriceAndDescription';

class App extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            description : '',
            price : ''
        }

        this.inputHandler = this.inputHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);

    }

    clickHandler(event){
        console.log('Quieres añadir un precio y descripción');
    }

    inputHandler(event){

    if(event.target.name === 'itemDescription'){
        this.setState({
            description : event.target.value
        });

    }
    if(event.target.name === 'itemPrice'){
        this.setState({
            price : event.target.value
        });
    
    }

    console.log('texto '+ event.target.value);
}


    render(){


        return(
            <SubmitPriceAndDescription
            descriptionVal={this.state.description}
            priceVal={this.state.price}
            handler={this.inputHandler}
            buttonHandler={this.clickHandler} />
            );
    }
}

ReactDOM.render(
    <App/>
    ,
    document.getElementById('root'));