//////////
//MongoDB
/////////
//todo: test what happens when mongo is not running
//                        when the database does not exist
//                        when the test table does not exist

var MongoClient = require('mongodb').MongoClient;

module.exports.dbBrsMsg = "";

console.log("initMongo");

function buildDBMsg(msg)
{
  console.log(msg);
  module.exports.dbBrsMsg+=msg+"\n\n";
}

const defaultUrl = 'mongodb://localhost:27017';

// Connect to the db
MongoClient.connect(defaultUrl, function(err, client) {
  if(!err) {
    module.exports.instance = client.db('mydb');
    if (module.exports.instance) {
      module.exports.testColl = module.exports.instance.collection('test');
      if (module.exports.testColl) {
        buildDBMsg("Success: Database Connected \n");
        module.exports.testColl.find().toArray(function (err, items) {
          buildDBMsg(JSON.stringify(items));
        });
      }
      else
      {
        buildDBMsg("Error03: test Collection does not exist!");
      }
    }
    else
    {
      buildDBMsg("Error02: Database does not exist!");
    }

  }
  else
  {
    buildDBMsg("Error01: " + err);
  }
});
