const express = require('express');
const database = require('../database');
const router = express.Router();
const url = require('url');

function searchItem(successHandler, database, reqUrl) {
  let finalArray = [];
  let a = url.parse(reqUrl, true);
  database
    .ref()
    .once('value')
    .then(function(snapshot) {
      let currentDb = snapshot.val().movie;
      let temp = Object.keys(a.query);
      let flag = false;
      if (temp[0] === 'actor') {
        for (let idx in currentDb) {
          let currentItem = currentDb[idx];
          let some = a.query.actor.toLowerCase();
          let stars = currentItem.stars;
          for (let i in stars) {
            let currentStar = stars[i].toLowerCase();
            if (currentStar.indexOf(some) !== -1) {
              flag = true;
            }
          }
          if (flag === true) {
            finalArray.push(currentItem);
            flag = false;
          }
        }
      } else if (temp[0] === 'title') {
        for (let idx in currentDb) {
          let currentItem = currentDb[idx];
          //verification can affect result of search, be ready
          let some = a.query.title && a.query.title.toLowerCase();
          let title = currentItem && currentItem.title && currentItem.title.toLowerCase();
          if (title && (title.indexOf(some) !== -1)) {
            finalArray.push(currentItem);
          }
        }
      }
      successHandler(finalArray);
    });
}

//FIXME move search to server method, add postman scheme for search
router.get('/movies/search', function(req, res) {
  let success = function(i) {
    res.json({ message: i, status: 'ok' });
  };

  searchItem(success, database, req.url);
});

module.exports = router;
