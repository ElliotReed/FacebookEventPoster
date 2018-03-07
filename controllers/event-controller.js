// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");

// Routes
// =============================================================

// GET route for getting all of the event
router.get("/api/event", function(req, res) {
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
router.get("/api/event/:id", function(req, res) {
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
router.event("/api/event", function(req, res) {
  db.Event.create(req.body).then(function(dbEvent) {
    res.json(dbEvent);
  });
});

// DELETE route for deleting event
router.delete("/api/event/:id", function(req, res) {
  db.Event.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbEvent) {
    res.json(dbEvent);
  });
});

// PUT route for updating event
router.put("/api/event", function(req, res) {
  db.Event.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbEvent) {
    res.json(dbEvent);
  });
});

// Export routes for server.js to use.
module.exports = router;
