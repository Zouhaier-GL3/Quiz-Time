const {Request, validate} = require('../models/request'); 
const mongoose = require('mongoose');
const express = require('express');
const _=require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {

    console.log(req.body)
    const { err } = validate(req.body); 
    if (err) return res.status(400).send(error.details[0].message);
    let request = await Request.findOne({email:req.body.email});
    if(request) return res.status(400).send('request alerady registred.');
   request = new Request({ 
        name: req.body.name,
        message: req.body.message,
        email: req.body.email,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        catégoie_produit: req.body.catégoie_produit,
        
     

     });

       request = new Request(_.pick(req.body,['name','message','email','adresse','telephone','catégoie_produit']))
       request.etat="en attente"

request = await request.save();
return res.send(request) ;
})

router.get('/',async (req,res)=>{
    const request = await Request.find();
    res.send(request);
  })

 module.exports=router;