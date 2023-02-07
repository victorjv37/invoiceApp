const express = require("express");
const router = express.Router();
var pg = require("pg");

router.patch("/:invoiceId", (request, response) => {
  const id = request.params.invoiceId;
  const input = request.body;
  var conString =
    "postgres://tbsifhep:vc-HK00-0KSl1FysW9tMUe7jehXh0Qx4@rogue.db.elephantsql.com/tbsifhep"; //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    client.query(
      `UPDATE INVOICE
      SET sellername = '${input.sellername}',
      selleraddress = '${input.selleraddress}',
      customername = '${input.customername}',
      customeraddress = '${input.customeraddress}',
      finalprice = '${input.finalprice}',
      terms = '${input.terms}',
      invoicedescription = '${input.invoicedescription}'
      WHERE id = ${id}`,
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
