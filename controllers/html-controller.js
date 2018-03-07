// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();
// var path = require("path");

// Import the model (cat.js) to use its database functions.
// var db = require("../models");

// Routes
// =============================================================

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  // router.get("/", function(req, res) {
    // db.event.findAll(function(data) {
    //   var hbsObject = {
    //     event: data
    //   };
    //   console.log(hbsObject);
    //   res.render("index", hbsObject);
    // });
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // cms route loads cms.html
  // router.get("/cms", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

  // blog route loads blog.html
  // router.get("/blog", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // authors route loads author-manager.html
  // router.get("/authors", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });


module.exports = router;
