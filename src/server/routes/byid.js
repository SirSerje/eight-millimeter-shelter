const express = require('express');
const database = require('../database');
const DATABASE_MOVIES_SELECTOR = require('../constants').DATABASE_MOVIES_SELECTOR;
const router = express.Router();

function byid(successHandler, database, id, failHandler) {
  database
    .ref(`/${DATABASE_MOVIES_SELECTOR}`)
    .once('value')
    .then(function(snapshot) {
      let result = snapshot.val()[id];
      if (result) {
        successHandler(result);
      } else {
        failHandler();
      }
    });
}

//GET BY ID
router.get('/movies/:movieId', function(req, res) {
  let id = req.params.movieId;
  let successHandler = function(i) {
    res.json({ message: i });
  };
  let failHandler = function() {
    res.status(426).json({ message: 'item not found' });
  };
  byid(successHandler, database, id, failHandler);
});

module.exports = router;
