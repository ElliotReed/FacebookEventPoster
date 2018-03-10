// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the event
  app.get("/api/event", function(req, res) {
    var query = {};
    if (req.query.client_id) {
      query.ClientId = req.query.client_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Client
    db.Event.findAll({
      where: query,
      include: [db.Client]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Get rotue for retrieving a single event
  app.get("/api/event/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Client
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Client]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // EVENT route for saving a new event
  app.post("/api/event", function(req, res) {
    console.log("thisisisis" + req.body);
    db.Event.create(req.body).then(function(dbEvent) {
      console.log(dbEvent);
      res.json(dbEvent);
    });
  });

  // DELETE route for deleting event
  app.delete("/api/event/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // PUT route for updating event
  app.put("/api/event", function(req, res) {
    db.Event.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });
};
