const express = require('express');
const database = require('./database');
const router = express.Router();

router.route('/').get(function(req, res) {
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