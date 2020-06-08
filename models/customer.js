const mongoose = require('mongoose');
const Joi = require('joi');


const customer_schema = new mongoose.Schema({
    name : {type :String, required : true},
    phone: Number,
    message : {type :String, required : true},
    
});

const Customer = mongoose.model('customer', customer_schema);

// customer validator
const customer_body_validator = {
    name : Joi.string().min(1).max(30).required(),
    phone: Joi.number().positive(),
    message : Joi.string().min(1).max(30).required()
}

module.exports.Customer = Customer;
module.exports.customer_body_validator = customer_body_validator;