const express = require('express');
const morgan = require('morgan');
const appDebug = require('debug')('app:debug');
const bodyParser = require('body-parser');
//registration
const cors = require('cors');
//authentification
const passport = require('passport');
const config = require('./config/passportConfig');
const customer_router = require('./routers/customer');
const student_router = require('./routers/category');
const product_router = require('./routers/product');
const request_router=require('./routers/request_router')
const connectDB = require('./db/connect');

const port = process.env.PORT || 3000;
connectDB('mongodb://localhost:27017/webSite');
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

 app.use(passport.initialize());

const model = require('./models/user');
const user_router = require('./routers/user_router');
app.use('/api/users',user_router); 

app.use(express.static('public'));
app.use('/api/category',student_router);
app.use('/api/product',product_router);
app.use('/api/request',request_router);

app.listen(port , () => appDebug(`Listening on ${port}....`));