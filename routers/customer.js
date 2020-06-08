const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Customer, customer_body_validator } = require('../models/customer')
//get All customer
router.get("/list",async (req,res)=>{
    var customer = await Customer.find(); // select * from customer
    res.send(customer);
});

//post new customer
router.post("/add",async (req,res)=>{ 
    console.log(req.body)
    var res_validation = Joi.validate(req.body,customer_body_validator);
    if(res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
    var customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        message : req.body.message   
    });
    let savedCustomer = await customer.save();
    res.send(savedCustomer);
});

//update customer by Id
router.put('/update/id/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].messphone);
    var res_validation = Joi.validate(req.body, customer_body_validator_update);
    if (res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
    var customer = {
        name: req.body.name,
        phone: req.body.phone,
        message : req.body.message
    };

    var old_customer = await Customer.findById(req.params.id); // select * from customer
    customer = _.merge(old_customer,customer);
    old_customer = await Customer.findByIdAndUpdate(req.params.id, customer); // select * from customer
    if (!old_customer)
        return res.status(404).send('customer with this Id is missing');
    res.send(old_customer);
});


//delete customer by Id
router.delete('/id/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].message);
    var customer = await Customer.findByIdAndRemove(req.params.id); // select * from customer
    if (!customer)
        return res.status(404).send('customer with this Id is missing');
    res.send(customer);
});
  
module.exports = router;