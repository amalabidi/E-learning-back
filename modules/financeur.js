const { boolean } = require("joi");
var mongoose = require("mongoose");

const financeurSchema = new mongoose.Schema({
    dispositif_formation:{
     type:String,
     required:true
    },
    financeur:{
        type:String,
     required:true

    },
    actif:{
        type:Boolean,
        default:false
    }
},
{ timestamps: true }
);

const Financeur = mongoose.model("Financeur", financeurSchema);
exports.Financeur = Financeur;