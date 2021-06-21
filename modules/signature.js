const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const SignatureSchema = new mongoose.Schema({
  
    dossier_Id : {
        type : Schema.Types.ObjectId , 
        ref:"Dossier"
    },
    clientMail:{
        type:String 
    },
    clientMobile:{
        type:String 
    },
    fileName : {
        type:String 
    },
    sigReqUuid:{
        type:String 
    },docUuid:{
        type:String
    }
    
},{timestamps:true});

const Signature = mongoose.model("Signature", SignatureSchema);

exports.Signature = Signature;
