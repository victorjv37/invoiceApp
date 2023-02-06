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
import Layout from './Components/Layout';


class App extends React.Component{
   
    constructor(props){
        super(props);
    
    }
    
    render(){
        return(
            <Layout updateMode invoiceId='63e0e3bb254b6853cced5f55'/>
        );
    }
}

ReactDOM.render(
    <App/>
    ,
    document.getElementById('root'));