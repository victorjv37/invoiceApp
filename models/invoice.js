const mongoose = require("mongoose");

//schema
const invoiceSchema = new mongoose.Schema({
  sellername: {
    type: String,
    required: true,
  },
  selleraddress: {
    type: String,
    required: true,
  },
  customername: {
    type: String,
    required: true,
  },
  customeraddress: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  finalprice: {
    type: Number,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
  invoicedescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("invoice", invoiceSchema);
