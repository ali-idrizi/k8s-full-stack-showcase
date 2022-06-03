var express = require('express');

var app = module.exports = express()

app.get('/', function(req, res){
  res.send('Hello From todo-item');
});

if (!module.parent) {
  app.listen(3000);
  console.log('todo-item microservice started on port 3000');
}
