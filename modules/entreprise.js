const { boolean } = require("joi");
var mongoose = require("mongoose");

const entrepriseSchema = new mongoose.Schema({
    raison_social:{
     type:String,
     required:true
    },
    interne:{
        type:String
    },
    financeur:{
        type:String
    },
    vip:{
        type:String
    },
    categorie:{
        type:String
    },
    forme_juridique:{
        type:String
    },
    n_siret:{
        type:Number
    },
    code_ape_naf:{
        type:Number
    },
    n_tva:{
        type:Number
    },
    email:{
        type:String
    },
    tel:{
        type:Number
    },
    website:{
        type:String
    },
    numero_de_rue:{
        type:Number
    },
    comp_adresse:{
        type:String
    },
    code_postal:{
        type:Number
    },
    ville:{
        type:String
    },
    pays:{
        type:String
    },
    name:{
        type:String
    },
    lastname:{ 
         type:String
        },
    fonction_entreprise:{
          type:String
        },
    email_princ:{  
        type:String
    },
    tel_princ:{  
        type:Number
    },
    numero_de_rue_contact:{
        type:Number
    },
    comp_adresse_contact:{
        type:String
    },
    code_postal_contact:{
        type:Number
    },
    ville_contact:{
        type:String
    },
    pays_contact:{
        type:String
    },
    name_autre_contact:{
        type:String
    },
    lastname_autre_contact:{
        type:String
    },
    fonction_entreprisen_autre_contact:{
        type:String
    },
    email_autre_contact:{
        type:String
    },
    tel_autre_contact:{
        type:Number
    },
    numero_de_rue_autre_contact:{
        type:Number
    },
    comp_adresse_autre_contact:{
        type:String
    },
    code_postal_autre_contact:{
        type:Number
    },
    ville_autre_contact:{
        type:String
    },
    pays_autre_contact:{
        type:String
    },
    actif:{
        type:Boolean,
        default:false
    }
},
{ timestamps: true }
);

const Entreprise = mongoose.model("Entreprise", entrepriseSchema);
exports.Entreprise = Entreprise;