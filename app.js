var express = require('express');
var _ = require('lodash');
var app = express();

var raw = require('./data/characters.json');

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
  res.send(raw.data);
});

app.get('/simpsons/:id', function(req, res) {
  res.send(req.params.id);
})

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
