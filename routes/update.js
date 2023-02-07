const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

router.patch("/:invoiceId", (request, response) => {
  invoiceModel.updateOne(
    {
      _id: request.params.invoiceId,
    },
    {
      sellername: request.body.sellername,
      selleraddress: request.body.selleraddress,
      customername: request.body.customername,
      customeraddress: request.body.customeraddress,
      items: request.body.items,
      finalprice: request.body.finalprice,
      terms: request.body.terms,
      invoicedescription: request.body.invoicedescription,
    },
    function (err, result) {
      if (err) {
        console.log("ERROR: " + err);
        response
          .status(500)
          .json({ message: "no se pudo actualizar la información" });
      } else {
        console.log("la info se ha actualizado correctamente");
        response
          .status(200)
          .json({ message: "la info se ha actualizado correctamente" });
      }
    }
  );
});

module.exports = router;
