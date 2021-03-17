var express = require('express');
var router = express.Router();
const {User} = require('../models/user'); 
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/',async  function(req, res, next) {
    try {
        // Find all Users in the database
        const results = await User.find({});
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
  });



/* User ADD */ 
router.post('/', async function(req,res,next){
  const {name,
    lastname,
    password,
    email,
    mobile,
    company,
    habilitation,
    permissions,
    secondaryPermissions,
    authorisedConnection,
    groupedAction } = req.body ;

      try {  
            const oldUser = await User.find({email:email});
            if(oldUser.length!=0){
              res.send({error:"adresse already exist"}) ;      
            }else{
              const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({name,lastname,email,hashedPassword,mobile,company,habilitation,permissions,secondaryPermissions,authorisedConnection,groupedAction}) ; 
        // Saving the user in the database
        const results = await user.save();
        token = user.generateToken();
        res.header("x-auth-token", token).send(results);

      }
    } catch (ex) {  
        res.send(ex); }
    })
    /* User Duplicat */ 
    router.post('/duplicate', async function(req,res,next){
      const {userId,name,email,lastname,password,mobile } = req.body ;
      try {  
                const oldUser = await User.findOne({_id:userId});
                if(oldUser.length==0){
                  res.send({error:"user doesn't existe"}) ;      
                }else{
                  const  hashedPassword = await bcrypt.hash(req.body.password, 10);
                  const {
                    company,
                    habilitation,
                    permissions,
                    secondaryPermissions,
                    authorisedConnection,
                    groupedAction } = oldUser ;
            const user = new User({name,lastname,email,hashedPassword,mobile,company,habilitation,permissions,secondaryPermissions,authorisedConnection,groupedAction}) ; 
            // Saving the user in the database
            const results = await user.save();
            res.send(results);     
          }
        } catch (ex) {  
            res.send(ex); }
        })   



//  updating a user 
router.put('/',/*auth,  admin],*/ async (req, res) => {
  try {

      const {name, email} = req.body;
      //const{error}=joiSchema.updateSchema.validate({username:name,email:email});
      if(error){
          res.send({error:error["message"]}) ; 
      }else{ 

      let olduser = await User.findOne({email: req.user["email"]});
      if (!olduser) {
        // checking if the user already exist or not using the old email extracted from the token
          res.send({"error":"user doesn't existe"});
          return null;
      }else{
  
  const hashedPassword=olduser.hashedPassword;
  // verifying if the new email is an admin email or not 
     
     const filter = {"_id": olduser.id};
     const update = {
      name,
      lastname,
      email,
      mobile,
      company,
      habilitation,
      permissions,
      secondaryPermissions,
      authorisedConnection,
      groupedAction
      };

      let user = await User.findOneAndUpdate(filter, update, {new: true})
      newtoken = user.generateToken();

      res.header("x-auth-token", newtoken).send(user);
  }}} 
  catch (ex) {
      res.send(ex);}
})



module.exports = router;
