const mongoose = require('mongoose');
const Joi = require('joi');
  const subcategory_schema = new mongoose.Schema({
    name: {type :String, required : true},
    category :{type : mongoose.Schema.ObjectId , ref : 'Category'}
});
const SubCategory = mongoose.model('SubCategory', subcategory_schema);

 
const category_schema = new mongoose.Schema({
     name: {type :String, required : true},
});

const Category = mongoose.model('Category', category_schema);

// student validator
const category_body_validator = {
    name : Joi.string().min(1).max(30).required(),
     
}
module.exports.SubCategory=SubCategory
module.exports.Category = Category;
module.exports.category_body_validator = category_body_validator;