// config/passport.js

// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

// load up the user model
var db = require("../models");

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize clients out of session

  // used to serialize the client for the session
  passport.serializeUser(function(client, done) {
    done(null, client.id, client.dataValues.firstname, client.dataValues.lastname);
  });

  // used to deserialize the client
  passport.deserializeUser(function(id, done) {
    db.Client.findById(id).then(function(client) {
      if (client) {
        done(null, client.get());
      } else {
        done(client.errors, null);
      }
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // asynchronous
        // Client.findOne wont fire unless data is sent back
        process.nextTick(function() {
          // find a client whose email is the same as the forms email
          // we are checking to see if the client trying to login already exists
          db.Client.findOne({
            where: {
              email: email
            }
          }).then(function(client, err) {
            if (err) return done(err);

            // check to see if theres already a client with that email
            if (client) {
              console.log("signupMessage", "That email is already taken.");
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              // if there is no client with that email
              // create the client
              db.Client.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                pageId: req.body.pageid,
                email: req.body.email,
                localPassword: db.Client.generateHash(password)
              })
                .then(function(dbClient) {
                  //console.log("created result: ", dbClient);
                  // send post back to render
                  return done(null, dbClient);
                })
                .catch(function(err) {
                  // handle error;
                  console.log(err);
                });
            }
          });
        });
      }
    )
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // callback with email and password from our form
        //console.log("\n>>>>>>>>>>>>>> localsignin: ", req);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.Client.findOne({
          where: {
            email: email
          }
        }).then(function(client, err) {
          // if there are any errors, return the error before anything else
          if (err) return done(err);

          // if no client is found, return the message
          if (!client)
            return done(
              null,
              false,
              req.flash("loginMessage", "No client found.")
            ); // req.flash is the way to set flashdata using connect-flash

          // if the client is found but the password is wrong
          if (!client.validPassword(password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            ); // create the loginMessage and save it to session as flashdata

          // all is well, return successful client
          return done(null, client);
        });
      }
    )
  );
};
