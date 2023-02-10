const koaPassport = require("koa-passport");
const { Strategy } = require("passport-local");
const { isValidPassword, loggerDeclaration } = require("../tools/utils");
const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const Config = require("../config");
const logger = loggerDeclaration();
const LocalStrategy = Strategy;

const configKoaPassport = () => {
  koaPassport.use(
    /* "login", */
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        console.log('Comprobar Login')
        mongoose.connect(Config.urlMongo);
        try {
          userModel.findOne(
            {
              email,
            },
            (err, user) => {
              if (err) {
                return done(err, null);
              }
              
              if (!user) {
                return done(null, false);
              }
              
              if (!isValidPassword(user, password)) {
                return done(null, false);
              }
              
              logger.info(user);
              return done(null, user);
            }
          );
        } catch (e) {
          return done(e, null);
        }
      }
    )
  );

  koaPassport.serializeUser((user, done) => {
    done(null, user._id);
  });

  koaPassport.deserializeUser((id, done) => {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });

};

module.exports = { configKoaPassport };
