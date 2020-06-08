const mongoose = require('mongoose');
const Joi = require('joi');
 

const product_schema = new mongoose.Schema({
    name : {type :String, required : true},
    barcode : {type :String, required : true},
    description: String ,
    prix : {type :String, required : true},
    old_prix : {type :String },
    quantite : {type :String, required : true},
    modele : {type :String  },
    image1 : {type :String, required : true},
    image2 : {type :String},
    image3 : {type :String},
    properties : [],
    enPub : {type :Boolean , default : false } ,
    couleurs : [] ,
    rating : {nb :{type : Number } ,value : {type :Number}},
    subcategory : {
        cat_id : {type : mongoose.Schema.ObjectId ,ref : 'SubCategory'}
    },
    seller : {
        _id : {type : mongoose.Schema.ObjectId , ref : 'User'}
    } ,
    enpromo : {type : Boolean , default : false },
    dataCre : {type : Date }

});

const Product = mongoose.model('product', product_schema);

// product validator
const product_body_validator = {
    name : Joi.string().min(1).max(30).required(),
    phone: Joi.number().positive(),
    message : Joi.string().min(1).max(30).required()
}

module.exports.Product = Product;
module.exports.product_body_validator = product_body_validator;