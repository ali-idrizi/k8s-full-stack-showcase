var express = require('express');

var app = module.exports = express()

app.get('/', function(req, res){
  res.send('Hello From todo-list');
});

if (!module.parent) {
  app.listen(3000);
  console.log('todo-list microservice started on port 3000');
}
