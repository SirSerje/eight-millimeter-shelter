const express = require('express');
const database = require('./database');
const router = express.Router();
//FIXME: very ugly
let LAST_ID = require('../../server').LAST_ID;
const bodyParser = require('body-parser');
const app = express();

router.post('/movies', function(req, res) {
  LAST_ID++;
  let movie = { ...req.body.movie, id: LAST_ID };
  let success = function() {
    res.json({ message: movie, status: 'ok' });
  };
  add(success, database, movie, LAST_ID);
});

module.exports = router;
