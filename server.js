const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const logger = require('./app/logs/logger');
const app = express();
const port = 8000;
const path = require('path');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', './app/views');
app.set('view engine', 'jade');
app.use(function(req, res, next) {
  logger.info('request', req.method, req.url);
  next();
});
MongoClient.connect(db.url, (err, database) => {
  const blogsDB = database.db('blogs');
  if (err) return console.log(err)
  require('./app/routes')(app, blogsDB);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
