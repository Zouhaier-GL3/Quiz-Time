const express = require('express');
const Joi = require('joi');
 const _ =require('lodash')
 const router = express.Router();
const { Category, category_body_validator,SubCategory } = require('../models/category')
//get All student
router.get("/list",async (req,res)=>{
    var students = await Category.find(); // select * from Student
    res.send(students);
});
router.get("/sublist",async (req,res)=>{
    var sublist = await SubCategory.find(); // select * from Student
    res.send(sublist);
});
router.get("/getsub/:id",async (req,res)=>{
    var sublist = await SubCategory.find({'category' :req.params.id}); // select * from Student
    res.send(sublist);
});
//post new student
router.post("/add",async (req,res)=>{
  
    console.log(req.body)
    var res_validation = Joi.validate(req.body,category_body_validator);
    if(res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
    var categorys = new Category({
        name: req.body.name,
          
    });
    let categoryso = await categorys.save();
    res.send(categoryso);
});
router.post("/addsub/:id",async (req,res)=>{
  
    console.log(req.params.id)
    console.log(req.body.name)
    var res_validation = Joi.validate(req.body,category_body_validator);
    if(res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
    var categorys =await Category.findById(req.params.id)
     var subCat = new SubCategory({
       'name': req.body.name,
       'category' : categorys
          
    });
   subCat= await subCat.save(subCat)
    res.send(subCat);
});
 

module.exports = router;