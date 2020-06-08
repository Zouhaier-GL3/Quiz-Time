
const Joi = require('joi');
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  message: {
    type: String,
    required: true,
    minlength: 10
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
 
  adresse: {
    ville: {
      type: String
    },
    gouv: {
      type: String
    },
    pays: {
      type: String
    },
    rue: {
      type: String
    }
  },
  telephone: {
    type: String
  },
  catégoie_produit:{
    type : String
  },
   
  etat:{
    type : String
  }
 
 

});
const Request = mongoose.model('Request', requestSchema);

function validateRequest(request) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      message: Joi.string().min(10).required(),
      email: Joi.string().min(5).max(255).required().email(),
      adresse: Joi.required(),
      telephone: Joi.string().min(5).max(50).required(),
  
    };
    return Joi.validate(request, schema);
}

mongoose.model('Request', requestSchema);

exports.Request = Request;
exports.validate = validateRequest;