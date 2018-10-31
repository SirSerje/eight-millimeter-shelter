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
  database
    .database()
    .ref('movie/' + id)
    .set(movie, function(error) {
      if (error) {
        res.json({ message: 'ERROR' }); //FIXME: CRASH HERE!!!
        console.warn('Oops, something happened', error);
      } else {
        database
          .database()
          .ref('options')
          .set({ max_id: id });
        successCallBack();
      }
    });
}

module.exports.getAll = getAll;
module.exports.add = add;
