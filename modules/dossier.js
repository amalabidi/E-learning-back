var mongoose = require('mongoose') 

const dossierSchema = new mongoose.Schema({
    
    status:{
        type : String
    } , 
    type :{
        type : String , 
        required : true 
    } , 
    provenance : {
        type : String , 
        required : true 
    }, 
    statusCall : {
        type : String , 
        required : true 
    } , 
    vendeur : 
    { type : String , 
        required : true 
    } , 
    categorie : { 
        type :String , 
        required : true 
    }, 
    entreprise : {
        type : String 
    } , 
    numeroEDOF : {
        type : String 
    } , 
    rappelGestionnaire : {
        type: Date 
    } , 
     dateRappel : {
        type : Date 
    } ,
     client : {
        type : String , 
        required : true 
    } , 
    confidentialObservation : {
        type : String
    } , 
    observation: { // a folder has two listes of observation : normal obervations and tracking observations  
        type : [String]
    } , 
    tracking : {
        type : [String]
    }
    })    

const Dossier = mongoose.model('Dossier',dossierSchema) ; 

exports.Dossier=Dossier ; 