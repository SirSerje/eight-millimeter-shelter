//PoC for mongoDB connection
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const client = new MongoClient(require('../config').mongoPath, { useNewUrlParser: true });
const router = express.Router();
const present = require('present');

//TODO: should be POST
router.get('/auth', function(req, res) {
  let time = present();

  client.connect(function(err, client) {
    if (err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }

    /*
    CREATE
    const collection = client.db('users').collection('users');
    collection.insertOne({ "msg" : "My First Document" }).then(i => {
      console.log(`Data has been successfully sent. Время выполнения = ${Math.round(present()-time)} мс`);
      res.send({msg:'ok'});
    });
    */

    /*
    READ
    collection.findOne({ _id: '1' }, function(err, result) {
      if (err) throw err;
      console.log('result: ', result);
      console.log(`Время выполнения = ${Math.round(present()-time)} мс`);
    });
    */
    client.close();
  });
});

module.exports = router;
