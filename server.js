//dependencias
const express = require ('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { request } = require('http');
const { response } = require('express');

//db conexion
mongoose.connect('mongodb+srv://victorjv37:Javier2002@apiinvoices.3ckx2wq.mongodb.net/?retryWrites=true&w=majority',{
           useNewUrlParser: true,
           useUnifiedTopology: true });

mongoose.connection.on('error',(error)=>{
        console.log('ERROR: ' + error);
});

mongoose.connection.once('open',()=>{
    console.log('The Database connection is working');
});

//configuracion body-parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//static web server
app.use(express.static(path.join(__dirname,'dist')));

//ruta
app.use('/api/createinvoice', require('./routes/create.js') );

app.use('/api/readinvoice', require('./routes/read.js') );

app.use('/api/updateinvoice', require('./routes/update.js') );

app.use('/api/deleteinvoice', require('./routes/delete.js') );

app.get('*',(request, response )=>{
    response.sendFile(path.join(
        __dirname,'dist/invoiceGenerator.html'));
});
//puerto
app.listen(3000,()=>{
    console.log('Listening at localhost:3000');
});