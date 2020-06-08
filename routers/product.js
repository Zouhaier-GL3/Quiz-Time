const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Product, product_body_validator } = require('../models/product')



var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage })

router.post('/upload', async function (req, res, next) {
  console.log(req.file);
   
  console.log(req.body)
  var product = new Product({
    name: req.body.name,
    barcode : req.body.barcode ,
    image1: req.body.image1,
    image2: req.body.image2,
    image3: req.body.image3,
    modele : req.body.modele ,
    couleurs : req.body.couleurs ,
    quantite : req.body.quantite ,
    properties : req.body.properties ,
    description: req.body.description,
    prix: req.body.prix,
    subcategory: {
      cat_id: req.body.subcategory 
    } ,
    seller : {
      _id : req.body.seller_id 
    },
    dataCre : new Date() ,

  });
  let savedProduct = await product.save();
  res.send(savedProduct);

})


//get All product
router.get("/list", async (req, res) => {
  var product = await Product.find(); // select * from product
  res.send(product);
});

//get by id
router.get("/:id", async (req, res) => {
   
  var product = await Product.findById(req.params.id); // select by id from product
  res.send(product);
});

//get by id
router.get("/related/bysub/:idsub", async (req, res) => {
   
  var products = await Product.find({'subcategory.cat_id' : req.params.idsub}); // select by sub cat from product
  res.send(products);
});

//get by seller id
router.get("/myproducts/:id", async (req, res) => {
   
  var products = await Product.find({'seller._id' : req.params.id}); // select by seller from product
  res.send(products);
});

//post new product
router.post("/add", async (req, res) => {
  console.log(req.body)
  var res_validation = Joi.validate(req.body, product_body_validator);
  if (res_validation.error)
    return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
  var product = new Product({
    name: req.body.name,
    phone: req.body.phone,
    message: req.body.message
  });
  let savedProduct = await product.save();
  res.send(savedProduct);
});

//update product by Id
router.put('/update/id/:id', async (req, res) => {
  var valid_id = Joi.validate(req.params, id_validator);
  if (valid_id.error)
    return res.status(400).send(valid_id.error.details[0].messphone);
  var res_validation = Joi.validate(req.body, product_body_validator_update);
  if (res_validation.error)
    return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
  var product = {
    name: req.body.name,
    phone: req.body.phone,
    message: req.body.message
  };

  var old_product = await product.findById(req.params.id); // select * from product
  product = _.merge(old_product, product);
  old_product = await Product.findByIdAndUpdate(req.params.id, product); // select * from product
  if (!old_product)
    return res.status(404).send('product with this Id is missing');
  res.send(old_product);
});


//delete product by Id
router.delete('/id/:id', async (req, res) => {
  var valid_id = Joi.validate(req.params, id_validator);
  if (valid_id.error)
    return res.status(400).send(valid_id.error.details[0].message);
  var product = await Product.findByIdAndRemove(req.params.id); // select * from product
  if (!product)
    return res.status(404).send('product with this Id is missing');
  res.send(product);
});

module.exports = router;