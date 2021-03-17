var mongoose = require('mongoose') 
const {JsonWebTokenError} = require('jsonwebtoken');
//const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type : String , 
        required : true 
    }, 
    
    lastname : {
        type : String , 
        required : true 
    },
     
    hashedPassword: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },

    email : {
        type : String , 
        required : true 
    },

    mobile : {
        type: Number , 
    },

    company : {
        type:String 

    }, 
     habilitation : {
        type : [String] 
    }
    , 
    permissions : {
        type:[String]
    }, 
    secondaryPermissions : {
        type:[String]
    },
      authorisedConnection : {
           type : Boolean
     } , 
     groupredActions : { 
         type:[String]
     }})

const User = mongoose.model('User',userSchema) ; 

userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id, name: this.name, email: this.email, lastname: this.lastname}, "jwtPrivateKey");
}

exports.User=User ; 