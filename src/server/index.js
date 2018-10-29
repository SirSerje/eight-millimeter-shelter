function getAll(successCallback, database) {
  database
    .ref()
    .once('value')
    .then(function(i) {
      successCallback(i);
    })
    .catch(); //FIXME #2 add error handling for requests
}

module.exports.getAll = getAll;
