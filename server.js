//inspired with: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const database = require('./src/server/database');

//FIXME: remove this
const add = require('./src/server').add;

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
router.route('/movies/upload').post(function(req, res) {
  for (let i in req.body.movie) {
    let current = req.body.movie[i];
    LAST_ID++;
    let movie = { ...current, id: LAST_ID };
    add(() => {}, database, movie, LAST_ID);
  }
  res.json({ message: 'ok' }); //FIXME: server sends 'that correct' but its not truth
});

app.use('/api', require('./src/server/getAll'));
app.use('/api', require('./src/server/searchItem'));
app.use('/api', require('./src/server/addItem'));

app.use('/api', require('./src/server/getById'));
app.use('/api', require('./src/server/updateItem'));
app.use('/api', require('./src/server/deleteItem'));

app.use('/api', router);

const server = app.listen(PORT, function() {
  console.log('app running on port.', server.address().port);
});

//FIXME: VERY UGLY
module.exports.LAST_ID = LAST_ID;
