var express = require('express');
var app = express();

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

app.get('/simpsons/',function(req,res){
  res.status(201).send({
  "shup":chris
}
  );
});

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
