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
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!",
    "Region": process.env.REGION || 'Missing Region'
  });
});

app.get('/wait',function(req,res){
  // var sleep = require('sleep');
  // sleep.sleep(10); // sleep for ten seconds
  res.send({
    "Output": "Hello World from wait!",
    "Region": process.env.REGION || 'Missing Region'
  })
})

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.get('/simpsons/', function(req, res) {

  var characters = _.map(raw.data, i => _.pick(i, '_id', 'firstName', 'lastName'));
  res.send(characters);
});

app.get('/simpsons/:id', function(req, res) {
  res.send(_.find(raw.data, {
    '_id': req.params.id
  }));
});

app.get('/simpsons/:id/phrases', function(req, res) {
  res.send(_.filter(phrases.data, {
    'character': req.params.id
  }));
});

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
