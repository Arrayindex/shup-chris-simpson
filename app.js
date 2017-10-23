var express = require('express');
var app = express();

var raw = require('./data/characters.json');

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

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
