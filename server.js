// set up ======================================================

var express = require("express");
var methodO = require("method-override");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;

var passport = require("passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session"); // cookie session

// import models
var db = require("./models");

require("./config/passport")(passport); // pass passport for configuration

// Parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.log(err);
});

// Handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// session secret set to a random long mix of keys
app.use(
  session({
    key: "user_sid",
    resave: false,
    secret: "mdoieuewjknfdsm,cso9d/apfmng,dsjkuijkfnmwP",
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: false
    }
  })
);

// set up passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use(methodO("_method"));
// require('./config/passport')(passport);

// routes ======================================================

// routes to be listening for
require("./controllers/event-controller.js")(app);
var routes = require("./controllers/html-controller");
var clients = require("./controllers/client-controller");

app.use("/", routes);
app.use("/clients", clients);


// launch ======================================================

// syc db and listen for port 6060 or set port
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});