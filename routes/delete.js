const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');


router.delete('/:invoiceNumber',(request, response )=>{

invoiceModel.deleteOne({
         _id : request.params.invoiceNumber
    },(err)=>{
        if(err){
            console.log('ERROR: '+ err );
            response.status(500).json({message:'no se pudo borrar la factura'});
           } else{
            console.log('la factura se ha borrado correctamente');
            response.status(200).json({message:'la factura se ha borrado correctamente'});
           }
    });

    
});

module.exports = router;