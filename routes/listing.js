const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");

const listingConroller = require("../controllers/listing.js");

// Index Route
router.get("/", wrapAsync(listingConroller.index));
// New Route
router.get("/new",isLoggedIn, listingConroller.newListing);
// Show Route
router.get("/:id", wrapAsync(listingConroller.showListing));

// Create Route
router.post("/", validateListing, isLoggedIn, wrapAsync( listingConroller.createListing));
// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync
    (listingConroller.editListing));
// Update Route
router.put("/:id",  isLoggedIn, isOwner, validateListing, wrapAsync(listingConroller.updateListing));
// Delete Route
router.delete("/:id",  isLoggedIn, isOwner, wrapAsync(listingConroller.delListing));

module.exports = router;