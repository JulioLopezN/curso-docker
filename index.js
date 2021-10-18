const express = require('express')
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Connection URL
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/curso';

app.get('/', async (req, res) => {
  let client = null;
  try {
    client = await MongoClient.connect(mongoUrl);
  
    const db = client.db();
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
  
    res.status(200).send(JSON.stringify({
      message: 'success',
      data: users
    }));
  } catch (err) {
    res.status(500).send({ error: 'Ocurrió un error 😢: ' + err });
  } finally {
    if (client) client.close();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))
