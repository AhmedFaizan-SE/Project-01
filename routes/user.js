const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

const userConroller = require("../controllers/user.js");

router.route("/signup")
.get( userConroller.renderSignup)
.post(userConroller.userSignup);

router.route("/login")
.get(userConroller.renderLogin)
.post(saveRedirectUrl,
     passport.authenticate("local",
         { failureRedirect: "/login", failureFlash: true}),
          userConroller.userLogin
      );

router.get("/logout", userConroller.userLogout);

module.exports = router;