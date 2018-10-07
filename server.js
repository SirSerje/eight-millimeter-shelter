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
const url = require('url');
const admin = require('firebase-admin');
const querystring = require('querystring');
const firebase = require("firebase");
const PORT = 4125
const MAX_ITEMS = 20

let config = {
  apiKey: "AIzaSyBs17-j5048eEmoPJk7WxX8zx47Io6XMwk",
  authDomain: "movie-shelve.firebaseapp.com",
  databaseURL: "https://movie-shelve.firebaseio.com",
  projectId: "movie-shelve",
  storageBucket: "movie-shelve.appspot.com",
  messagingSenderId: "168547079024"
};

firebase.initializeApp(config);
let database = firebase.database();

//variable, which holds highest ID
let LAST_ID = -1;

database.ref('options').once('value').then(function (snapshot) {
   LAST_ID = snapshot.val().max_id;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  //console.log('Something is happening.');
  next();
});

//DEFAULT ROUTE
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

//ADD
router.route('/movies').post(function (req, res) {
  LAST_ID++;
  let movie = {...req.body.movie, id:LAST_ID}
    firebase.database().ref('movie/' + LAST_ID).set(
      movie, function(error) {
    if (error) {
      res.json({message: 'ERROR'});
    } else {
      firebase.database().ref('options').set({max_id:LAST_ID})
      res.json({ message: movie, status:'ok'});
    }
  })


//GET ALL
}).get(function (req, res) {
  database.ref().once('value').then(function (snapshot) {
    res.json(snapshot.val().movie);
  })
  .catch();  //FIXME #2 add error handling for requests
});


//SEARCH
router.route('/movies/search')
  .get(function(req, res) {
    let finalArray = []
    let a = url.parse(req.url, true);
    database.ref().once('value').then(function(snapshot) {
      let currentDb = snapshot.val().movie;
      let temp = Object.keys(a.query)
      if (temp[0] === 'actor') {
        for (let idx in currentDb) {
          let currentItem = currentDb[idx]
          let some = a.query.actor.toLowerCase()
          let stars = currentItem.stars
          for (let i in stars) {
            let currentStar = stars[i].toLowerCase();
            if ((currentStar).indexOf(some) !== -1) {
              finalArray.push(currentItem)
            }
          }
        }
      } else if (temp[0] === 'title') {
        for (let idx in currentDb) {
          let currentItem = currentDb[idx]
          let some = a.query.title.toLowerCase()
          let title = currentItem.title.toLowerCase()
          if (title.indexOf(some) !== -1) {
            finalArray.push(currentItem)
          }
        }
      }
      res.json({message: finalArray})
    })
  })

//GET BY ID
router.route('/movies/:movieId')
  .get(function (req, res) {
    database.ref().once('value').then(function(snapshot) {
      res.json(snapshot.val().movie[req.params.movieId])
    })
  })
  //UPDATE
  .put(function (req, res) {
    firebase.database().ref('movie/' + req.params.movieId).update(req.body.movie).then(i =>
      res.json( { message: req.body.movie, status:'ok' } )
    )
      .catch();  //FIXME #2 add error handling for requests
  })
  //DELETE
  .delete(function(req, res) {
    database.ref().once('value').then(function(snapshot) {
      if (snapshot.val().movie[req.params.movieId] === undefined)
      {
        res.status(426).json({message: 'item not found'})
      } else {
        firebase.database().ref('movie/' + req.params.movieId).remove()
          .then(i => {res.json({message: req.body.movie, status: 'ok'})})
          .catch(err => res.status(426).json({message: err}));
      }
    })
  });

app.use('/api', router);

const server = app.listen(PORT, function () {
  console.log("app running on port.", server.address().port);
});
