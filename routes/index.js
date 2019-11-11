var express = require('express');
let mongoInstance = require('../mongoInit');
var router = express.Router();

console.log("initIndexRoute");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {
        title: 'Express',
        dbMsg: mongoInstance.dbBrsMsg
      });
});

module.exports = router;
