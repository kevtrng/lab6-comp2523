const GithubStrategy = require("passport-github").Strategy;
const passport = require("passport");
require("dotenv").config();
const userController= require("../controllers/userController");

passport.serializeUser(function(user, done) {
  if(!user){
      done({message:"sigh"}, null);
  }
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});
  const githubLogin = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback",
  },
  function(accessToken, refreshToken, profile, cb){
    let user = userController.findOrCreate(profile);
    return cb(null, user);
  }
)


  module.exports = passport.use(githubLogin)