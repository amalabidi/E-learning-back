var mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
    civilite:{
        type:String
    },
    nir:{
        type:String
    },
    name:{
        type:String,
        required:true
    }, 
    lastname:{
        type:String,
        required:true
    }, 
    tel:{
        type:Number
    },
    email:{
        type:String
    },
    date_de_naissance:{
        type:Date
    },
    lieu_de_naissance:{
        type:String
    },
    nationalites:{
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
    profil:{
        type:String
    },
    entreprise:{
        type:String
    },
    dernier_diplome:{
        type:String
    },
    n_pole_emploi:{
        type:Number
    },
    dis_formation:{
        type:String
    },
    financeur:{
        type:String
    },
    actif:{
        type:Boolean,
        default:false
    }
},
{ timestamps: true }
);

const Participant = mongoose.model("Participant", ParticipantSchema);
exports.Participant = Participant;