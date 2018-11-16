const express = require('express');
const database = require('../database');
const router = express.Router();

function removeItem(successCallback, notFound, failCallback, database, id) {
  database
    .ref()
    .once('value')
    .then(function(snapshot) {
      if (snapshot.val().movie[id] === undefined) {
        notFound();
        return null;
      } else {
        database
          .ref('movie/' + id)
          .remove()
          .then(i => successCallback(i))
          .catch(err => failCallback(err));
      }
    });
}

//DELETE
router.delete('/movies/:movieId', function(req, res) {
  let id = req.params.movieId;
  let success = function(i) {
    res.json({ message: req.body.movie, status: 'ok' });
  };
  let fail = function(err) {
    res.status(426).json({ message: err });
  };
  let notFound = function() {
    res.status(426).json({ message: 'item not found' });
  };

  removeItem(success, notFound, fail, database, id);
});

module.exports = router;
