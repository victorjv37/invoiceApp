const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");
var pg = require("pg");

router.get("/all", (request, response) => {
  //or native libpq bindings
  //var pg = require('pg').native

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

  //   invoiceModel.find((err, docs) => {
  //     if (err) {
  //       console.log("ERROR: " + err);
  //       response.status(500).json({ message: "No se pudo leer la información" });
  //     } else {
  //       console.log("Se ha leido la información correctamente");
  //       response.status(200).json(docs);
  //     }
  //   });
});

router.get("/:invoiceNumber", (request, response) => {
  invoiceModel.findOne(
    {
      _id: request.params.invoiceNumber,
    },
    (err, doc) => {
      if (err) {
        console.log("ERROR: " + err);
        response
          .status(500)
          .json({ message: "No se pudo encontrar la factura" });
      } else {
        console.log("Se ha encontrado la factura");
        response.status(200).json(doc);
      }
    }
  );
});

module.exports = router;
