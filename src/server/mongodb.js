//PoC for mongoDB connection
const uri = 'mongodb+srv://X:Y@cluster0-cpecu.gcp.mongodb.net/test'; //TODO: insert you log:pass
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(function(err, client) {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
  }

  const collection = client.db('users').collection('users');

  collection.findOne({ _id: '1' }, function(err, result) {
    if (err) throw err;
    console.log('result: ', result);
  });

  client.close();
});
