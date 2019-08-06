const express = require('express');
const database = require('../database');
const router = express.Router();
const DATABASE_MOVIES_SELECTOR = require('../constants').DATABASE_MOVIES_SELECTOR;
const DATABASE_OPTIONS_SELECTOR = require('../constants').DATABASE_OPTIONS_SELECTOR;

let idController = require('../idController');

//TODO: duplication of add.js > add()
function add(successCallBack, database, movie, id) {
  database.ref(`${DATABASE_MOVIES_SELECTOR}/` + id).set(movie, function(error) {
    if (error) {
      res.json({ message: 'ERROR' }); //FIXME: CRASH HERE!!!
      console.warn('Oops, something happened', error);
    } else {
      database.ref(`${DATABASE_OPTIONS_SELECTOR}`).set({ max_id: id });
      successCallBack();
    }
  });
}

router.post('/movies/upload', function(req, res) {
  for (let i in req.body.movie) {
    let current = req.body.movie[i];
    idController.ID++;
    let movie = { ...current, id: idController.ID };
    add(() => {}, database, movie, idController.ID);
  }
  res.json({ message: 'ok' }); //FIXME: server sends 'that correct' but its not truth
});


module.exports = router;