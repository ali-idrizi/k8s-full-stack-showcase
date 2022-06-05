var express = require('express');

const app = express()
const router = express.Router();

router.use('/', async function(req, res){
  res.send('Hello From todo-list');
});

app.use("/api/todo-list", router);

app.listen(3000, () => console.log('todo-list microservice started on port 3000'));
