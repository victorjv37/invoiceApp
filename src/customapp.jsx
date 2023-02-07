import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import MainContainer from './Components/MainContainer';
import CustomTextField from './Components/CustomTextField';
import CustomTextArea from './Components/CustomTextArea';
import PricesAndDescriptions from './Components/PricesAndDescriptions';
import SubmitPriceAndDescription from './Components/SubmitPriceAndDescription';
import CustomAlert from './Components/CustomAlert';
import Layout from './Components/Layout';
import DisplayInvoice from './Components/DisplayInvoice';
import DisplayAllInvoices from './Components/DisplayAllInvoicess';
import LoadInvoiceUpdater from './Components/LoadInvoiceUpdater';
import LoadDisplayInvoice from './Components/LoadDisplayInvoice';
import Homepage from './Components/Homepage';
import NotFound from './Components/NotFound';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';




class App extends React.Component{
   
    constructor(props){
        super(props);
    
    }
    
    render(){
        return(
            // <MainContainer head='Invoice Generator'>
            //     <Layout updateMode invoiceId='63e0e3bb254b6853cced5f55'/>
            // </MainContainer>
            // <DisplayInvoice invoiceId='63e0e3bb254b6853cced5f55'/>
            //<DisplayAllInvoices/>
            <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Homepage/>
                </Route>
                <Route path='/createinvoice'>
                 <MainContainer head='Invoice Generator'>
                     <Layout/>
                 </MainContainer>
                </Route>
                <Route path='/showallinvoices'>
                    <DisplayAllInvoices/>
                </Route>
                <Route path='/updateinvoice/:invoiceId'>
                    <LoadInvoiceUpdater/>
                </Route>
                <Route path='/displayinvoice/:invoiceId'>
                    <LoadDisplayInvoice/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>
    ,
    document.getElementById('root'));