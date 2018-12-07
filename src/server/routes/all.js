const express = require('express');
const database = require('../database');
const DATABASE_MOVIES_SELECTOR = require('../constants').DATABASE_MOVIES_SELECTOR;
const router = express.Router();

router.get('/movies', function(req, res) {
  database
    .ref(`/${DATABASE_MOVIES_SELECTOR}`)
    .once('value')
    .then(function(snapshot) {
      res.json(snapshot.val());
    })
    //FIXME #2 add error handling for requests
    .catch();
});

module.exports = router;
