const MongoClient = require('mongodb').MongoClient;
// Connection url
const url = 'mongodb://localhost:27017/test';
// Connect using MongoClient
MongoClient.connect(url, (connectError, db) => {
  // Create a collection we want to drop later
  const col = db.collection('classroom');
  // Show that duplicate records got dropped
  col.find({}).toArray((error, items) => {
    console.log(items);
    db.close();
  });
});
