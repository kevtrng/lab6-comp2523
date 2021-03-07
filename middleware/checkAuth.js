module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
  isAdmin: function (req, res, next) {
    if (req.user.isAdmin === true) {
    console.log('session user is admin');
    return next();
  }
  res.redirect('/');
},
};
