const database = require('./database');

class IdController {
  constructor() {
    this.LAST_ID = -1;
    this.getLastIdFromDatabase();
  }

  getLastIdFromDatabase() {
    database
      .ref('options')
      .once('value')
      .then(snapshot => {
        this.LAST_ID = snapshot.val().max_id;
      })
      .catch(error => console.warn('ERROR', error));
  }

  get ID() {
    return this.LAST_ID;
  }

  set ID(value) {
    this.LAST_ID = value;
  }

  writeDatabaseID(database, id) {
    database.ref('options').set({ max_id: id });
  }
}

let idController = new IdController();

module.exports = idController;
