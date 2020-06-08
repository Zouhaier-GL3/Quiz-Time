const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const configg = require('../config/config');


const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  roles : {
    type: [String], 
    default: ['user']
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
  image: {
    type: String
  },
  dateCre : {
    type : Date , default : new Date()
  }

});

userSchema.methods.verifyPassword = function (password) { //vérify password

  return bcrypt.compareSync(password /*plain password*/ , this.password /*encrypted password*/ );

};

userSchema.methods.generateJwt = function () {
  return jwt.sign({
      _id: this._id,roles: this.roles , name : this.name
    },
    process.env.JWT_SECRET);
}

//method M
/*userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id:this._id, name : this.name, isAdmin : this.isAdmin},config.get('jwtPrivateKey'));
  return token;
}*/
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()

  };

  return Joi.validate(user, schema);
}


mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;