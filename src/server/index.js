//FIXME: try to unify passing params for all methods
const url = require('url');

function getAll(successCallback, database) {
  database
    .ref()
    .once('value')
    .then(function(i) {
      successCallback(i);
    })
    .catch(); //FIXME #2 add error handling for requests
}

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

function removeItem(successCallback, notFound, failCallback, database, id) {
  database
    .ref()
    .once('value')
    .then(function(snapshot) {
      if (snapshot.val().movie[id] === undefined) {
        notFound();
        return null;
      } else {
        database
          .ref('movie/' + id)
          .remove()
          .then(i => successCallback(i))
          .catch(err => failCallback(err));
      }
    });
}

function updateItem(successHandler, database, id, movie) {
  database
    .ref('movie/' + id)
    .update(movie)
    .then(i => successHandler())
    .catch(); //FIXME #2 add error handling for requests
}

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
          let some = a.query.title.toLowerCase();
          let title = currentItem.title.toLowerCase();
          if (title.indexOf(some) !== -1) {
            finalArray.push(currentItem);
          }
        }
      }
      successHandler(finalArray);
    });
}
module.exports.getAll = getAll;
module.exports.removeItem = removeItem;
module.exports.add = add;
module.exports.updateItem = updateItem;
module.exports.searchItem = searchItem;
