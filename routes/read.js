const express = require("express");
const router = express.Router();
var pg = require("pg");

router.get("/all", (request, response) => {
  var conString =
    "postgres://tbsifhep:vc-HK00-0KSl1FysW9tMUe7jehXh0Qx4@rogue.db.elephantsql.com/tbsifhep"; //Can be found in the Details page
  var client = new pg.Client(conString);
  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    client.query("SELECT * FROM INVOICE", function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      console.log("*");
      console.log(result.rows);
      response.status(200).json(result.rows);
      client.end();
    });
  });
});

router.get("/:invoiceNumber", (request, response) => {
  console.log(request.params.invoiceNumber);
  const id = Number(request.params.invoiceNumber);

  var conString =
    "postgres://tbsifhep:vc-HK00-0KSl1FysW9tMUe7jehXh0Qx4@rogue.db.elephantsql.com/tbsifhep"; //Can be found in the Details page
  var client = new pg.Client(conString);
  let invoice = {};
  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    client.query(
      `SELECT * FROM invoice WHERE id = ${id};`,
      function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        console.log("*");
        console.log(result.rows);
        invoice = result.rows[0];
        response.status(200).json(invoice);
      }
    );
  });
});

module.exports = router;
