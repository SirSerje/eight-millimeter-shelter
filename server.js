//inspired with: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const database = require('./src/server/database');
const add = require('./src/server/routes/addItem').add;

//config
const PORT = 4125;

//init
let LAST_ID = -1;

//get last id from database
database
  .ref('options')
  .once('value')
  .then(function(snapshot) {
    LAST_ID = snapshot.val().max_id;
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware
router.use(function(req, res, next) {
  if (LAST_ID < 0) {
    res.status(503).json({ message: 'server not connected to DB, please wait for a while' });
  }
  // do logging
  //console.log('Something is happening.');
  next();
});

//DEFAULT ROUTE
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

//UPLOAD


//routing
app.use('/api', require('./src/server/routes/getAll'));
app.use('/api', require('./src/server/routes/searchItem'));

app.use('/api', require('./src/server/routes/addItem'));
app.use('/api', require('./src/server/routes/upload'));

app.use('/api', require('./src/server/routes/getById'));
app.use('/api', require('./src/server/routes/updateItem'));
app.use('/api', require('./src/server/routes/deleteItem'));

app.use('/api', router);

const server = app.listen(PORT, function() {
  console.log('app running on port.', server.address().port);
});

//FIXME: VERY UGLY
module.exports.LAST_ID = LAST_ID;
