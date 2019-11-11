var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


var dbBrowserMsg = "";
var coll;

function buildDBMsg(msg)
{
  dbBrowserMsg+=msg+"\n\n";
}

const defaultUrl = 'mongodb://localhost:27017';

// Connect to the db
MongoClient.connect(defaultUrl, function(err, client) {
  if(!err) {
      var db = client.db('mydb');
      coll = db.collection('test');
      buildDBMsg("We are connected: \n");
      coll.find().toArray(function(err, items)
      {
          buildDBMsg(JSON.stringify(items));
      });

  }
  else
  {
    buildDBMsg("Error: " + err);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {
        title: 'Express',
        dbMsg: dbBrowserMsg,
          coll: coll
      });
});

module.exports = router;
