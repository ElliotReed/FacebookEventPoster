var db = require("../models");

module.exports = function(app) {
  app.get("/api/clients", function(req, res) {
    // Find all clients and their events
    db.Client.findAll({
      include: [db.event]
    }).then(function(dbClient) {
      res.json(dbClient);
    });
  });

  app.get("/api/clients/:id", function(req, res) {
    // Find a single client and their events
    db.Client.findOne({
      where: {
        id: req.params.id
      },
      include: [db.event]
    }).then(function(dbClient) {
      res.json(dbClient);
    });
  });

  app.event("/api/clients", function(req, res) {
    // Create new client
    db.Client.create(req.body).then(function(dbClient) {
      res.json(dbClient);
    });
  });

  app.delete("/api/clients/:id", function(req, res) {
    // Delete client
    db.Client.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbClient) {
      res.json(dbClient);
    });
  });

};
