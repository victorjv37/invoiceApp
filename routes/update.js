const express = require('express');
const router = express.Router();
const invoiceModel = require('../models/invoice.js');

router.patch('/:invoiceId',(request, response )=>{


       invoiceModel.updateOne({
           _id : request.params.invoiceId
        },{
            sellerName : request.body.sellerName,
            sellerAddress : request.body.sellerAddress,
            customerName : request.body.customerName,
            customerAddress : request.body.customerAddress,
            items : request.body.items,
            finalPrice : request.body.finalPrice,
            terms : request.body.terms,
            invoiceDescription : request.body.invoiceDescription
        },function(err, result ){
            if(err){
                console.log('ERROR: '+ err );
                response.status(500).json({message:'no se pudo actualizar la información'});
               } else{
                console.log('la info se ha actualizado correctamente');
                response.status(200).json({message:'la info se ha actualizado correctamente'});
               }
        });
});

module.exports = router;
