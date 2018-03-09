// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
var path = require("path");

// Import the model (cat.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {
  // Routes
  // =============================================================

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    // res.send('Hello');
    var query = {
      ClientId: 1
    };
    db.Event.findAll({
      where: query,
      include: [db.Client]
    }).then(function(data) {
      var hbsObject = {
        event: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
      // res.end();
    });
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  app.get("/logintest", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/logintest.html"));
  });

  // blog route loads blog.html
  // router.get("/blog", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // authors route loads author-manager.html
  // router.get("/authors", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });
};
