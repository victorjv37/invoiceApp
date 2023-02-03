import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class MainContainer extends React.Component{

    render(){
        return(
            <Jumbotron>
                <h1>Hello World</h1>
                <p>Random text...</p>
            </Jumbotron>
            );
    }
    
}