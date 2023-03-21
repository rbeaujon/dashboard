const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

// Routes
const routes = require('./routes/routes');

// cross-origin requests and data transfers
app.use(cors({
	origin: '*',
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// to process data sent in an HTTP request body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

// Assign Routes
app.use('/', routes);

app.listen(3001);