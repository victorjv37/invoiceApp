import React from 'react';
import  ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContainer from './Components/MainContainer';
import CustomTextField from './Components/CustomTextField';
import CustomTextArea from './Components/CustomTextArea';
import PricesAndDescriptions from './Components/PricesAndDescriptions';

class App extends React.Component{
   
    constructor(props){
        super(props);

    }


    render(){

        const info = [
            {description: 'Playera Verde', price: '150'},
            {description: 'Playera Azul', price: '250'},
            {description: 'Playera Gris', price: '200'}
        ];
        
        return(
            <PricesAndDescriptions
            itemsInfo={info} />
            );
    }
}

ReactDOM.render(
    <App/>
    ,
    document.getElementById('root'));