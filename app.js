var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var fs = require('fs');
var yaml = require('js-yaml');
const swaggerJSDoc = require('swagger-jsdoc');
var bodyParser = require('body-parser');
var config = require('config');
var host = config.get('apiConfig.host');
var port = config.get('apiConfig.port');
var baseUrl = config.get('apiConfig.baseUrl');

var app = express();
module.exports = app;

app.use(express.static('dist'));
app.use('/spec', express.static('spec'));

// Base Info
const swaggerDefinition = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'サンプル API DOC',
  },
  schemes: ['http', 'https'],
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json', 'multipart/form-data'],
  host: host + port,
  basePath: baseUrl,
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: [__dirname + '/spec/swagger.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/apidoc', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/swagger.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.send(swaggerSpec);
});

var port = process.env.PORT || 10010;
app.listen(port);
