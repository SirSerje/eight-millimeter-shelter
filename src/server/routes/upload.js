const express = require('express');
const database = require('../database');
const router = express.Router();
const add = require('./addItem').add;
//FIXME: very ugly
let LAST_ID = require('../').LAST_ID;


router.post('/movies/upload', function(req, res) {
  for (let i in req.body.movie) {
    let current = req.body.movie[i];
    LAST_ID++;
    let movie = { ...current, id: LAST_ID };
    add(() => {}, database, movie, LAST_ID);
  }
  res.json({ message: 'ok' }); //FIXME: server sends 'that correct' but its not truth
});


module.exports = router;