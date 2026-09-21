const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");

const listingConroller = require("../controllers/listing.js");

// Inder & Create Route
router.route("/").
get(wrapAsync(listingConroller.index)).
post(validateListing, 
     isLoggedIn,
     wrapAsync( listingConroller.createListing));

// New Route
router.get("/new",isLoggedIn, listingConroller.newListing);

// Show, Upate & Delete Route     
router.route("/:id")
.get(wrapAsync(listingConroller.showListing))
.put( isLoggedIn, isOwner, validateListing,
     wrapAsync(listingConroller.updateListing))
.delete( isLoggedIn, isOwner,
     wrapAsync(listingConroller.delListing));



// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync
    (listingConroller.editListing));

module.exports = router;