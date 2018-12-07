const database = require('./database');
const DATABASE_OPTIONS_SELECTOR = require('./constants').DATABASE_OPTIONS_SELECTOR;

class IdController {
  constructor() {
    this.LAST_ID = -1;
    this.getLastIdFromDatabase();
  }

  getLastIdFromDatabase() {
    database
      .ref(`${DATABASE_OPTIONS_SELECTOR}`)
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
    database.ref(`${DATABASE_OPTIONS_SELECTOR}`).set({ max_id: id });
  }
}

let idController = new IdController();

module.exports = idController;
