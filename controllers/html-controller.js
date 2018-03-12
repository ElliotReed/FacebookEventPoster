var express = require('express');
var router = express.Router();

// Get Homepage
router.get("/", function(req, res) {
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

module.exports = router;