const express = require('express');
const router = express.Router();
const DATABASE_MOVIES_SELECTOR = require('../constants').DATABASE_MOVIES_SELECTOR;

router.get('/', function(req, res) {
  res.json({ message: 'health ok' });
});

module.exports = router;