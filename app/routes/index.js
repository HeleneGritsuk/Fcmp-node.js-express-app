const blogsRoutes = require('./routes')
module.exports = function(app, db) {
  blogsRoutes(app, db);
};
