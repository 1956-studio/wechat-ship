var express = require('express');
var router = express.Router();

var controllers = require("../controllers/index.js")

router.get('/', function(req, res) {
  res.render('index', { title: 'Main' });
});

module.exports = router;
