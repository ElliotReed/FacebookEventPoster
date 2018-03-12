var db = require("../models");
var express = require("express");
var passport = require("passport");
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

// ====================== HTML Routes ========================= //

// Register
router.get("/signup", function(req, res) {
  res.render("signup");
});

// Login
router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/account", function(req, res) {
  console.log("#####", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("####", req.session);
    var hdblBrObj = {
      loggedIn: req.isAuthenticated()
    };
    res.render("account", hdblBrObj);
  } else {
    res.redirect("/");
  }
});

// ====================== API Routes ========================= //

// process the signup form ==============================================
//=======================================================================

router.post("/signup", function(req, res, next) {
  passport.authenticate("local-signup", function(err, user, info) {
    if (err) {
      //console.log("passport err", err)
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success: false, message: "authentication failed" });
    }

    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************

    req.login(user, function(loginErr) {
      if (loginErr) {
        //console.log("loginerr", loginerr)
        return next(loginErr);
      }

      //console.log('redirecting....');
      var status = {
        code: 200,
        isLoggedIn: true,
        userId: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      };

      res.cookie("user_first", user.firstname);
      res.cookie("user_last", user.lastname);

      res.render("account", status);
    });
  })(req, res, next);
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local-login", function(err, user, info) {
    if (err) {
      //console.log("passport err", err)
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      // return res.send({ success: false, message: "authentication failed" });
      return res.render("login");
    }

    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************

    req.login(user, function(loginErr) {
      if (loginErr) {
        //console.log("loginerr", loginErr)
        return next(loginErr);
      }

      console.log();
      var status = {
        code: 200,
        isLoggedIn: true,
        userId: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      };
      console.log(user.firstname);
      console.log(status);

      res.cookie("user_first", user.firstname);
      res.cookie("user_last", user.lastname);

      res.render("account", status);
    });
  })(req, res, next);
});

// logout of user account
router.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    req.logout();
    res.clearCookie("user_first");
    res.clearCookie("user_last");
    res.clearCookie("user_sid");
    res.redirect("/");
  });
});

function getCurrentuserId(req) {
  var userId;
  if (req.isAuthenticated()) {
    userId = req.session.passport.user;
  } else {
    userId = false;
  }
  return userId;
}

//edge casing for wild card
router.get("*", function(req, res, next) {
  if (req.url.indexOf("/api") == 0) return next();
  if (req.url.indexOf("/assets") == 0) return next();
  if (req.url.indexOf("/css") == 0) return next();
  res.render("index");
});

module.exports = router;
