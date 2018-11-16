const express = require('express');
const database = require('./database');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

function updateItem(successHandler, database, id, movie) {
  database
    .ref('movie/' + id)
    .update(movie)
    .then(i => successHandler())
    .catch(); //FIXME #2 add error handling for requests
}

//UPDATE
router.put('/movies/:movieId', function(req, res) {
  let id = req.params.movieId;
  let movie = req.body.movie;
  let success = function() {
    res.json({ message: req.body.movie, status: 'ok' });
  };
  updateItem(success, database, id, movie);
});

module.exports = router;