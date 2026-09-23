const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");

const listingConroller = require("../controllers/listing.js");

// Listing routes: list all listings + create a new one.
router.route("/")
  .get(wrapAsync(listingConroller.index))
  .post(
    validateListing,
    isLoggedIn,
    wrapAsync(listingConroller.createListing)
  );

// Route to render the form for creating a new listing.
router.get("/new", isLoggedIn, listingConroller.newListing);

// Routes for a single listing: view, update, and delete.
router.route("/:id")
  .get(wrapAsync(listingConroller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingConroller.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingConroller.delListing)
  );

// Edit form route for a listing.
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingConroller.editListing)
);

module.exports = router;