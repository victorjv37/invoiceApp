//dependencias
const express = require ('express');
const path = require('path');
const app = express();

//static web server
app.use(express.static(path.join(__dirname,'dist')));

//ruta
app.use('/api/createinvoice', require('./routes/create.js') );

app.use('/api/readinvoice', require('./routes/read.js') );

app.use('/api/updateinvoice', require('./routes/update.js') );

app.use('/api/deleteinvoice', require('./routes/delete.js') );

//puerto
app.listen(3000,()=>{
    console.log('Listening at localcost:3000');
});