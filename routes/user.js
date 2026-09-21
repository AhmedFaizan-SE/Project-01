const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

const userConroller = require("../controllers/user.js");

router.get("/signup", userConroller.renderSignup);

router.post("/signup", userConroller.userSignup);

router.get("/login", userConroller.renderLogin);

router.post("/login",saveRedirectUrl,
     passport.authenticate("local",
         { failureRedirect: "/login", failureFlash: true}),
          userConroller.userLogin
      );

router.get("/logout", userConroller.userLogout);

module.exports = router;