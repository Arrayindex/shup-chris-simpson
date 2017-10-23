var express = require('express');
var _ = require('lodash');
var app = express();

var raw = require('./data/characters.json');
var phrases = require('./data/phrases.json')

app.set('json spaces', 4);

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

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
