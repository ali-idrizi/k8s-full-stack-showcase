var express = require('express');

const app = express()
const router = express.Router();

router.use('/', async function(req, res){
  res.send('Hello From todo-item');
});

app.use("/api/todo-item", router);

app.listen(3000, () => console.log('todo-item microservice started on port 3000'));
