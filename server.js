//inspired with: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const url = require('url');
const firebase = require('firebase');
const getAll = require('./src/server').getAll;
const add = require('./src/server').add;
const removeItem = require('./src/server').removeItem;
const updateItem = require('./src/server').updateItem;
const searchItem = require('./src/server').searchItem;
const getById = require('./src/server').getById;
const config = require('./src/server/config');

//config
const PORT = 4125;

//init
firebase.initializeApp(config);

let database = firebase.database();
let LAST_ID = -1;
let isInit = false;

//get last id from database
database
  .ref('options')
  .once('value')
  .then(function(snapshot) {
    LAST_ID = snapshot.val().max_id;
    isInit = true;
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to use for all requests
router.use(function(req, res, next) {
  if (!isInit)
    res.status(503).json({ message: 'server not connected to DB, please wait for a while' });
  // do logging
  //console.log('Something is happening.');
  next();
});

//DEFAULT ROUTE
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/movies/upload').post(function(req, res) {
  for (let i in req.body.movie) {
    let current = req.body.movie[i];
    LAST_ID++;
    let movie = { ...current, id: LAST_ID };
    add(() => {}, database, movie, LAST_ID);
  }
  res.json({ message: 'ok' }); //FIXME: server sends 'that correct' but its not truth
});
//ADD
router
  .route('/movies')
  .post(function(req, res) {
    LAST_ID++;
    let movie = { ...req.body.movie, id: LAST_ID };
    let success = function() {
      res.json({ message: movie, status: 'ok' });
    };
    add(success, database, movie, LAST_ID);
    //GET ALL
  })
  .get(function(req, res) {
    getAll(function(snapshot) {
      res.json(snapshot.val().movie);
    }, database);
  });

//SEARCH
//FIXME move search to server method, add postman scheme for search
router.route('/movies/search').get(function(req, res) {
  let success = function(i) {
    res.json({ message: i, status: 'ok' });
  };
  searchItem(success, database, req.url);
});

//GET BY ID
router
  .route('/movies/:movieId')
  .get(function(req, res) {
    let id = req.params.movieId;
    let successHandler = function(i) {
      res.json({message:i});
    };
    let failHandler = function () {
      res.status(426).json({ message: 'item not found' });
    };
    getById(successHandler, database, id, failHandler);
  })
  //UPDATE
  .put(function(req, res) {
    let id = req.params.movieId;
    let movie = req.body.movie;
    let success = function() {
      res.json({ message: req.body.movie, status: 'ok' });
    };
    updateItem(success, database, id, movie);
  })
  //DELETE
  .delete(function(req, res) {
    let id = req.params.movieId;
    let success = function(i) {
      res.json({ message: req.body.movie, status: 'ok' });
    };
    let fail = function(err) {
      res.status(426).json({ message: err });
    };
    let notFound = function() {
      console.log('not found called');
      res.status(426).json({ message: 'item not found' });
    };

    removeItem(success, notFound, fail, database, id);
  });

app.use('/api', router);

const server = app.listen(PORT, function() {
  console.log('app running on port.', server.address().port);
});
