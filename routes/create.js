const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");
var pg = require("pg");

router.post("/", (request, response) => {
  const input = request.body;
  var conString =
    "postgres://tbsifhep:vc-HK00-0KSl1FysW9tMUe7jehXh0Qx4@rogue.db.elephantsql.com/tbsifhep"; //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    client.query(
      `INSERT INTO INVOICE (sellername, selleraddress, customername, customeraddress, finalprice, terms, invoicedescription) VALUES ('${input.sellername}', '${input.selleraddress}', '${input.customername}', '${input.customeraddress}', '${input.finalprice}', '${input.terms}', '${input.invoicedescription}');`,
      function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        response.status(201).json({});
        client.end();
      }
    );
  });
});

module.exports = router;
