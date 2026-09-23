const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");

const listingConroller = require("../controllers/listing.js");

// Main listing collection routes:
// - GET /listings        => view all listings
// - POST /listings       => create a new listing after validation and login checks
router.route("/")
  .get(wrapAsync(listingConroller.index))
  .post(
    validateListing,
    isLoggedIn,
    wrapAsync(listingConroller.createListing)
  );

// New listing form route: only authenticated users can access it.
router.get("/new", isLoggedIn, listingConroller.newListing);

// Single listing actions:
// - GET /listings/:id     => view one listing
// - PUT /listings/:id     => update only if owner and valid input
// - DELETE /listings/:id  => remove only if owner
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