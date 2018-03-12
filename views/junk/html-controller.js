// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
// var path = require("path");

// Import the model (cat.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {
  // Routes
  // =============================================================
  
  // Get Homepage
  app.get("/", function(req, res) {
      console.log("#####", req.isAuthenticated());
      var hdblBrObj = {
        loggedIn: req.isAuthenticated()
      };
    
      if (req.isAuthenticated()) {
        res.redirect("/account");
      } else {
        res.render("index", hdblBrObj);
      }
    });
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/account", function(req, res) {
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
      res.render("account", hbsObject);
      // res.end();
    });
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  });


};
