var  mongoose = require('mongoose') ; 


// an observation can be a normal observation or a trcking observation 

const observationSchema = new mongoose.Schema({
    type : {
        type : String  , 
        required : true 
    }  , 
    content : {
        type : String  , 
        required : true
    } , 
    time : {
        type : Date 
    } , 
    author : {
        type : String , 
        required : true 
    } , 
    dossier : {
        type : String
    }


})