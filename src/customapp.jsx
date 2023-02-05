import React from 'react';
import  ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import MainContainer from './Components/MainContainer';
import CustomTextField from './Components/CustomTextField';
import CustomTextArea from './Components/CustomTextArea';
import PricesAndDescriptions from './Components/PricesAndDescriptions';
import SubmitPriceAndDescription from './Components/SubmitPriceAndDescription';
import CustomAlert from './Components/CustomAlert';

class App extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            show : false
        }

        this.closeHandler = this.closeHandler.bind(this);
        this.openHandler = this.openHandler.bind(this);
    }

    closeHandler(){
        this.setState({
            show : false
        });
    }

    openHandler(){
        this.setState({
            show : true
        });
    }
    
    render(){
        return(
            <div>
                <Button 
                variant='primary' 
                size='lg'
                onClick={this.openHandler}>
                    Mostrar ventana emergente
                </Button>
                <CustomAlert
            show={this.state.show}
            title='Mensaje de prueba'
            content='Random text bla bla...'
            close={this.closeHandler} />
            </div>
            );
    }
}

ReactDOM.render(
    <App/>
    ,
    document.getElementById('root'));