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
       // required : true 
    } , 
    confidentialObservation : {
        type : String
    } , 
    observation: { // a folder has two listes of observation : normal obervations and tracking observations  
        type : [String]
    } , 
    tracking : {
        type : [String]
    } , 
    idWorkshop : {
         type : String 
    } ,
    priseEnCharge : {
        type : String , 
        required : true , 
        default : "CPF"
    } , 
    remise : {
        type : String 
    } , 
    workshopBeginDate : {
        type :String 
    } , 
    workshopEndDate : {
        type : String
    } , 
    description : { // la formation a été 
        type : String 
    } , 
    coaching :{
        type : Boolean , 
        default : false
    },
    coach : {
        type : String 
    } , 
    certification : {
      type : Boolean 
    } , 
    certificationId : {
        type : String 
    }, 
    certificationPassword : {
        type : String 
    }
    })    

const Dossier = mongoose.model('Dossier',dossierSchema) ; 

exports.Dossier=Dossier ; 