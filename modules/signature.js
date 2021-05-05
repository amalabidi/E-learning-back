const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
  

},{timestamps:true});

const Signature = mongoose.model("Signature ", SignatureSchema);

exports.Signature = Signature;
