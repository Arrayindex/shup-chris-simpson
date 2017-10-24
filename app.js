var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

var raw = require('./data/characters.json');
var phrases = require('./data/phrases.json');

var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

AWS.config.region = process.env.REGION

app.set('json spaces', 4);
app.use(bodyParser.urlencoded({
  extended: false
}));

function sendResponse(payload, req, res) {
  var sleepTime = Math.floor(Math.random() * 100) + 1;

  if (sleepTime > 80) {
    sleepTime = 6000
  }

  setTimeout(function() {
    res.send(payload)
  }, sleepTime);
}

app.get('/', function(req, res) {
  var message = {
    "Output": "Hello World!",
    "Region": process.env.REGION || 'Missing Region'
  };
  sendResponse(message, req, res);
});

app.get('/wait', function(req, res) {
  var message = {
    message: "Stuff"
  };
  sendResponse(message, req, res);
});

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.get('/simpsons/', function(req, res) {
  var characters = _.map(raw.data, i => _.pick(i, '_id', 'firstName', 'lastName'));
  sendResponse(characters, req, res);
});

app.get('/simpsons/:id', function(req, res) {
  var character = _.find(raw.data, {
    '_id': req.params.id
  });
  sendResponse(character, req, res);
});

app.get('/simpsons/:id/phrases', function(req, res) {
  var phrases = _.filter(phrases.data, {
    'character': req.params.id
  });
  sendResponse(phrases, req, res);
});

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
