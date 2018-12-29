const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

//config
const PORT = 4125;

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

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//NB: возможен кейс если база засетапилась не с тем LAST_ID возможно некоторые айтемы нельзя будет удалить

// middleware
// router.use(function(req, res, next) {
//   if (idController.ID < 0) {
//     res.status(503).json({ message: 'server not connected to DB, please wait for a while' });
//   }
//   next();
// });

app.use('/', require('./routes/default'));

app.use('/api', require('./routes/all'));
app.use('/api', require('./routes/search'));

app.use('/api', require('./routes/add'));
app.use('/api', require('./routes/upload'));

app.use('/api', require('./routes/byid'));
app.use('/api', require('./routes/update'));
app.use('/api', require('./routes/delete'));

app.use('/api', router);

const index = app.listen(PORT, function() {
  console.log('app running on port.', index.address().port);
});*/
