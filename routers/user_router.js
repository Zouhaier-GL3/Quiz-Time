const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const _=require('lodash');
const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt=require('bcrypt');
const express = require('express');
const router = express.Router();

const jwtHelper = require("../config/jwtHelper");

const auth=require('../middelwares/auth');
const ctrUser = require('../controller/user.controller');
//login M.hmida

router.get('/me',auth,async (req,res)=>{
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})
 
//registration M.hmida

router.post('/', async (req, res) => {
  console.log(req.body)
  const { err } = validate(req.body); 
  if (err) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email});
  if(user) return res.status(400).send('User alerady registred.');

 user = new User({ 
     name: req.body.name,
    email: req.body.email,
    password: req.body.password });
    user = new User(_.pick(req.body,['name','email','password','telephone']))
   const salt=await bcrypt.genSalt(10);//generate salt value
    user.password = await bcrypt.hash(user.password,salt);//use this salt to hash password

  user = await user.save();
  //const token = user.generateAuthToken();
  res.send(_.pick(user,['_id','name','email']));
});
//authentification moi mm
router.post('/authenticate',ctrUser.authenticate);
module.exports=router;
//user profile 
const jwthelper = require("../config/jwtHelper");


router.delete('/:id',jwtHelper.verifyJwtToken, ctrUser.deleteuser);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrUser.userProfile);
router.get('/roleuser',jwtHelper.verifyJwtToken, ctrUser.listuser);
router.get('/admins',jwtHelper.verifyJwtToken, ctrUser.listadmin);
router.get('/seller',jwtHelper.verifyJwtToken, ctrUser.listseller);
