//Namespaces to avoid warnings:
/** @namespace req.params.movieId */
/** @namespace router.use */
/** @namespace router.get */
/** @namespace router.route */

//inspired with: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const admin = require('firebase-admin');
const firebase = require("firebase");
const PORT = 4125

var config = {
  apiKey: "AIzaSyBs17-j5048eEmoPJk7WxX8zx47Io6XMwk",
  authDomain: "movie-shelve.firebaseapp.com",
  databaseURL: "https://movie-shelve.firebaseio.com",
  projectId: "movie-shelve",
  storageBucket: "movie-shelve.appspot.com",
  messagingSenderId: "168547079024"
};

firebase.initializeApp(config);
var database = firebase.database();

//variable, which holds highest ID
var LAST_ID = -1;

database.ref().once('value').then(function (snapshot) {
   LAST_ID = Math.max.apply(null, Object.keys(snapshot.val().movie));
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

//DEFAULT ROUTE
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

//ADD
router.route('/movies').post(function (req, res) {
  LAST_ID++;
  firebase.database().ref('movie/' + LAST_ID).set(
    req.body.movie, function(error) {
    if (error) {
      res.json({message: 'ERROR'});
    } else {
      res.json({message: 'movie created!'});
    }
  })
//GET ALL
}).get(function (req, res) {
  database.ref().once('value').then(function (snapshot) {
    res.json(snapshot.val().movie);
  })
});

//GET BY ID
router.route('/movies/:movieId')
  .get(function (req, res) {
    res.json({message: `${req.params.movieId} get this movie`});
  })
  //UPDATE
  .put(function (req, res) {
    res.json({message: `${req.params.movieId} update this movie`});
  })
  //DELETE
  .delete(function (req, res) {
    res.json({message: `${req.params.movieId} movie deleted`});
  });

app.use('/api', router);

const server = app.listen(PORT, function () {
  console.log("app running on port.", server.address().port);
});
