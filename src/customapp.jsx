import React from 'react';
import  ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContainer from './Components/MainContainer';

ReactDOM.render(
    <MainContainer head='Invoice Generator'>
        <p>Este parrafo es parte de children</p>
        <p>Este parrafo es parte de children</p>
        <p>Este parrafo es parte de children</p>
    </MainContainer>,
    document.getElementById('root'));