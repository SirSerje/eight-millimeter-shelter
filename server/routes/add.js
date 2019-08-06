const express = require('express');
const database = require('../database');
const router = express.Router();
const DATABASE_MOVIES_SELECTOR = require('../constants').DATABASE_MOVIES_SELECTOR;
let idController = require('../idController');

function add(successCallBack, database, movie, id) {
  database.ref(`${DATABASE_MOVIES_SELECTOR}/` + id).set(movie, function(error) {
    if (error) {
      res.json({ message: 'ERROR' }); //FIXME: CRASH HERE!!!
      console.warn('Oops, something happened', error);
    } else {
      idController.writeDatabaseID(database, id);
      successCallBack();
    }
  });
}

//TODO: maybe unused middleware
router.use(function(req, res, next) {
  if (idController.ID < 0) {
    res.status(503).json({ message: 'server not connected to DB, please wait for a while' });
  }
  // do logging
  //console.log('Something is happening.');
  next();
});

router.post('/movies', function(req, res, next) {
  if(isNaN(idController.ID) || idController.ID === undefined || idController.ID === null) {
    res.status(400).json({ message: 'LAST_ID is unknown' });
    next();
  } else {
    idController.ID++;
    let movie = { ...req.body.movie, id: idController.ID };
    let success = function() {
      res.json({ message: movie, status: 'ok' });
    };
    add(success, database, movie, idController.ID);
  }
});

module.exports = router;
