const express = require("express");
const router = express.Router();
const { connect } = require('./authRoute');
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");



router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});


router.get('/admin', isAdmin, (req, res) => {
  const allSessions = req.sessionStore.sessions;
  const userInfo = [];
  for (const sessionID in allSessions) {
    let sessionInfo = JSON.parse(allSessions[sessionID]);
    console.log(sessionInfo);
    console.log(sessionInfo.passport.user);
    userInfo.push({
      userID: sessionInfo.passport.user,
      sessionID: sessionID,
    });
  console.log(userInfo);
  res.render('admin', { user: req.user, userInfo });
}});


module.exports = router;
