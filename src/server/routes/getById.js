const express = require('express');
const database = require('../database');
const router = express.Router();

function getById(successHandler, database, id, failHandler) {
  database
    .ref()
    .once('value')
    .then(function(snapshot) {
      let result = snapshot.val().movie[id];
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
  getById(successHandler, database, id, failHandler);
});

module.exports = router;
