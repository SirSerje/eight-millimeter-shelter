const express = require('express');
const database = require('./database');
const router = express.Router();

router.get('/movies', function(req, res) {
  database
    .ref()
    .once('value')
    .then(function(snapshot) {
      res.json(snapshot.val().movie);
    })
    //FIXME #2 add error handling for requests
    .catch();
});

module.exports = router;
