//FIXME: try to unify passing params for all methods

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

module.exports.getAll = getAll;
module.exports.removeItem = removeItem;
module.exports.add = add;
