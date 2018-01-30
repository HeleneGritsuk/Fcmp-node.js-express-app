var ObjectID = require('mongodb').ObjectID;
const logger = require('../logs/logger');

module.exports = function(app, db) {

  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    db.collection('blogs').findOne(details, (err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(item);
      }
    });

  });
  app.get('/blogs', (req, res) => {
    db.collection('blogs').find({}).toArray((err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/blogs', (req, res) => {
    const post = {
      text: req.body.body,
      title: req.body.title
    };

    db.collection('blogs').insert(post, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    db.collection('blogs').remove(details, (err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send('Blog ' + id + ' deleted!');
      }
    });
  });
  app.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    const blog = {
      text: req.body.body,
      title: req.body.title
    };
    db.collection('blogs').update(details, blog, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(blog);
      }
    });
  });

  app.use(function(req, res) {
    res.render('404');
  });

};
