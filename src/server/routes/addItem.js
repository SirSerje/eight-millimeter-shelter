const express = require('express');
const database = require('../database');
const router = express.Router();

//FIXME: very ugly
let LAST_ID = require('../../../server').LAST_ID;


function add(successCallBack, database, movie, id) {
  database.ref('movie/' + id).set(movie, function(error) {
    if (error) {
      res.json({ message: 'ERROR' }); //FIXME: CRASH HERE!!!
      console.warn('Oops, something happened', error);
    } else {
      database.ref('options').set({ max_id: id });
      successCallBack();
    }
  });
}

router.post('/movies', function(req, res, next) {
  if(isNaN(LAST_ID) || LAST_ID === undefined || LAST_ID === null) {
    res.status(400).json({ message: 'LAST_ID is unknown' });
    next();
  } else {
    LAST_ID++;
    let movie = { ...req.body.movie, id: LAST_ID };
    let success = function() {
      res.json({ message: movie, status: 'ok' });
    };
    add(success, database, movie, LAST_ID);
  }
});

module.exports.add = add;
module.exports = router;
