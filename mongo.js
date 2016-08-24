const MongoClient = require('mongodb').MongoClient;
// Connection url
const url = 'mongodb://localhost:27017/test';
// Connect using MongoClient
MongoClient.connect(url, (connectError, db) => {
  const col = db.collection('beer');
  col.find({ 'properties.Zip': 59801 }).toArray((error, items) => {
    console.log(items);
    db.close();
  });
});
