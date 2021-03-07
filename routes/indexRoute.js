const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
	if (req.user.type === "Admin") {
		res.redirect("/admin");
	} else {
		res.render("dashboard", {
			user: req.user,
		});
	}
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  if (req.user.type === "Admin") {
	  res.render("admin", {
		  user: req.user,
		  sessionIDs: req.sessionStore,
	  })
  } else {
	  res.redirect("/dashboard");
  }
});

router.post("/revoke", (req, res) => {
	if(req.user.type == "Admin"){
	    let key = req.body.sesKey;
	    delete req.sessionStore.sessions[key];
		res.redirect("/admin");
	} else {
		res.redirect("/dashboard");
	}


});

module.exports = router;