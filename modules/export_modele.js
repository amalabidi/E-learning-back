const mongoose = require("mongoose");

const modeleSchema = new mongoose.Schema({



    dossierAttributes:{
        type:[String] , 
        required:true
    } , 

    clientAttributes: {
        type:[String] , 
        required:true
    } , 
    factureAttributes : {
        type:[String] , 
        required: true
    } , 
    workshopAttributes : {
        type:[String] , 
        required : true
    }

})


const Modele = mongoose.model("Modele", modeleSchema);

exports.Modele = Modele;