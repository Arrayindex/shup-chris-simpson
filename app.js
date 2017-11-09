var express = require('express');
var _ = require('lodash');
var app = express();

var raw = require('./data/characters.json');
var phrases = require('./data/phrases.json');

var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

AWS.config.region = process.env.REGION

app.set('json spaces', 4);

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

function sendResponse(payload, req, res) {
  var sleepTime = Math.floor(Math.random() * 100) + 1;
  var errorRate = Math.floor(Math.random() * 100) + 1;

  var status = 200;

  if (errorRate > 90) {
    status = 418;
    payload = {
      error: "D'OH!"
    };
  } else if (sleepTime > 90) {
    sleepTime = 15000
  }

  setTimeout(function() {
    res.status(status).send(payload)
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
  var characters = _.map(raw.data, i => _.pick(i, '_id', 'firstName', 'lastName', 'picture'));
  sendResponse(characters, req, res);
});

app.get('/simpsons/:id', function(req, res) {
  var character = _.find(raw.data, {
    '_id': req.params.id
  });
  sendResponse(character, req, res);
});

app.get('/simpsons/:id/phrases', function(req, res) {
  var resultSet = _.filter(phrases.data, {
    'character': req.params.id
  });
  sendResponse(resultSet, req, res);
});

app.post('/user/phrase', function(req, res) {
  var responseMessage = {
    "status": true,
    "description": "Saved Phrase Success",
    "message": req.body.phrase
  }

  if (!req.body.phraseId) {
    responseMessage.status = false;
    responseMessage.message = "Missing Phrase ID";
    responseMessage.description = "BELCH";

    return res.status(400).send(responseMessage);
  }

  sendResponse(responseMessage, req, res);
})

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
